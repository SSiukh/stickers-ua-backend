import createHttpError from 'http-errors';

import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header missing'));
  }
  const [bearer, accessToken] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Header must have type Bearer'));
  }

  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (session.accessTokenValidUntil < Date.now()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};

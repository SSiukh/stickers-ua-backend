import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'node:crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + FIFTEEN_MINUTES;
  const refreshTokenValidUntil = Date.now() + ONE_MONTH;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });

  if (!user) throw createHttpError(401, 'Unathorized');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const prevSession = createSession();
  const session = await SessionCollection.create({
    userId: user._id,
    ...prevSession,
  });

  return {
    session,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const refreshUser = async (cookies) => {
  const { refreshToken, sessionId } = cookies;

  const session = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < Date.now()) {
    await SessionCollection.findOneAndDelete({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.findOneAndDelete({ _id: session._id });

  const newSession = createSession();
  const createdSession = await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });

  const { name, email, role } = await UsersCollection.findById(session.userId);

  return {
    session: createdSession,
    user: {
      name,
      email,
      role,
    },
  };
};

export const logoutUser = (sessionId) =>
  SessionCollection.deleteOne({ _id: sessionId });

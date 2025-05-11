import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';

export const checkManager =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.MANAGER) && role === ROLES.MANAGER) {
      next();
      return;
    }

    next(createHttpError(403, 'Forbidden, only for manager'));
  };

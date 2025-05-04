import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (e) {
    next(createHttpError(400, e.message, { errors: e.details }));
  }
};

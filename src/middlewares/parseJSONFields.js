export const parseJSONFields = (fields) => (req, res, next) => {
  fields.forEach((field) => {
    if (typeof req.body[field] === 'string') {
      req.body[field] = JSON.parse(req.body[field]);
    }
  });
  next();
};

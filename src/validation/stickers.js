import Joi from 'joi';

export const createStickerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  info: Joi.string().min(3).max(300).required(),
  color: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.array()
    .items(
      Joi.string().valid(
        'standard',
        'holographic',
        'chrome',
        'mat',
        'space',
        'texture',
      ),
    )
    .required(),
  quantity: Joi.number().required(),
  discount: Joi.number(),
  onAbout: Joi.boolean(),
});

export const updateStickerSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  info: Joi.string().min(3).max(300),
  price: Joi.number(),
  type: Joi.array().items(
    Joi.string().valid(
      'standard',
      'holographic',
      'chrome',
      'mat',
      'space',
      'texture',
    ),
  ),
  quantity: Joi.number(),
  discount: Joi.number(),
  onAbout: Joi.boolean(),
});

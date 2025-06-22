import Joi from 'joi';

export const createInvoiceSchema = Joi.object({
  recipientName: Joi.string().required(),
  phone: Joi.string().min(9).required(),
  cityName: Joi.string().required(),
  warehouseIndex: Joi.string().required(),
  areaName: Joi.string().required(),
  settlementType: Joi.string().required(),

  paymentType: Joi.string().valid('cash', 'card').required(),
  comment: Joi.string().empty(''),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
});

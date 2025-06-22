import { model, Schema } from 'mongoose';
import { cartItemSchema } from './cart.js';

const orderSchema = new Schema(
  {
    invoice: {
      type: String,
      required: true,
      min: 14,
      max: 14,
    },
    recipientName: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },
    comment: {
      type: String,
    },
    products: [cartItemSchema],
    status: {
      type: String,
      enum: ['new', 'completed'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderCollection = model('Order', orderSchema);

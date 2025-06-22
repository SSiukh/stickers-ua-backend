import { model, Schema } from 'mongoose';

export const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'stickers',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CartCollection = model('Cart', cartSchema);

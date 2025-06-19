import { model, Schema } from 'mongoose';

const wishItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'stickers',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const wishSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true,
    },
    items: [wishItemSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const WishCollection = model('wish', wishSchema);

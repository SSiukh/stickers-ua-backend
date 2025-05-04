import { model, Schema } from 'mongoose';

const stickersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    onAbout: {
      type: Boolean,
    },
    info: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StickersCollection = model('stickers', stickersSchema);

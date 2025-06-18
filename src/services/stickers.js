import { StickersCollection } from '../db/models/stickers.js';

export const getAllStickers = async (type, search, color) => {
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (type) {
    filter.type = type;
  }

  if (color) {
    filter.color = color;
  }

  const stickers = await StickersCollection.find(filter);

  return {
    data: stickers,
  };
};

export const createSticker = async (payload) => {
  const contact = await StickersCollection.create({ ...payload });
  return contact;
};

export const getProductById = async (productId) => {
  const product = await StickersCollection.findOne({
    _id: productId,
  });
  return product;
};

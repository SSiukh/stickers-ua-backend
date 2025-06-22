import { StickersCollection } from '../db/models/stickers.js';

export const getAllStickers = async (type, search) => {
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (type) {
    filter.type = type;
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

export const updateProduct = async (productId, payload) => {
  const product = await StickersCollection.findByIdAndUpdate(
    productId,
    { $set: payload },
    { new: true },
  );

  return product;
};

export const deleteProduct = async (productId) => {
  const product = await StickersCollection.findByIdAndDelete(productId);

  return product;
};

import { StickersCollection } from '../db/models/stickers.js';

export const getAllStickers = async () => {
  const stickers = await StickersCollection.find();

  return {
    data: stickers,
  };
};

export const createSticker = async (payload) => {
  const contact = await StickersCollection.create({ ...payload });
  return contact;
};

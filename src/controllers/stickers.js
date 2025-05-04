import { createSticker, getAllStickers } from '../services/stickers.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getStickersController = async (req, res) => {
  const stickers = await getAllStickers();

  res.json({
    status: 200,
    message: 'Successfully found stickers!',
    data: stickers,
  });
};

export const createStickerController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const sticker = await createSticker({
    ...req.body,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a sticker!',
    data: sticker,
  });
};

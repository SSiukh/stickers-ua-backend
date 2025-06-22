import createHttpError from 'http-errors';
import {
  createSticker,
  getAllStickers,
  getProductById,
} from '../services/stickers.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getStickersController = async (req, res) => {
  const { type, search } = req.query;
  const stickers = await getAllStickers(type, search);

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

export const getStickersByIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(404, `Contact with id: ${productId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${productId}!`,
    data: product,
  });
};

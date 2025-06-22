import createHttpError from 'http-errors';
import {
  createSticker,
  deleteProduct,
  getAllStickers,
  getProductById,
  updateProduct,
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
    throw createHttpError(404, `Sticker with id: ${productId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found sticker with id ${productId}!`,
    data: product,
  });
};

export const updateStickerController = async (req, res) => {
  const { productId } = req.params;
  const payload = req.body;

  const product = await updateProduct(productId, payload);

  res.status(200).json({
    status: 200,
    message: `Successfully updated sticker with id: ${productId}`,
    data: product,
  });
};

export const deleteStickerController = async (req, res) => {
  const { productId } = req.params;

  await deleteProduct(productId);

  res.sendStatus(204);
};

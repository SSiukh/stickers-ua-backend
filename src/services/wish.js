import createHttpError from 'http-errors';
import { WishCollection } from '../db/models/wish.js';

export const getWishItems = async (userId) => {
  const wish = await WishCollection.findOne({ userId }).populate(
    'items.productId',
  );

  if (!wish) {
    throw createHttpError(404, 'Wish not found for this user');
  }

  return wish.items;
};

export const addItemToWish = async (userId, productId) => {
  if (!productId) {
    throw createHttpError(400, 'Invalid product data');
  }

  let wish = await WishCollection.findOne({ userId });

  if (!wish) {
    wish = await WishCollection.create({
      userId,
      items: [{ productId }],
    });
    return wish;
  }

  const existingItem = wish.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    throw createHttpError(400, 'Product is already exist in wishlist');
  } else {
    wish.items.push({ productId });
  }

  await wish.save();

  return wish;
};

export const deleteWishItem = async (userId, productId) => {
  const wish = await WishCollection.findOne({ userId });

  if (!wish) {
    throw createHttpError(404, 'Wish not found');
  }

  const itemIndex = wish.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw createHttpError(404, 'Item not found in wishlist');
  }

  wish.items.splice(itemIndex, 1);

  await wish.save();

  return wish;
};

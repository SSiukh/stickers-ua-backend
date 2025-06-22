import createHttpError from 'http-errors';
import { CartCollection } from '../db/models/cart.js';

export const getCartItems = async (userId) => {
  const cart = await CartCollection.findOne({ userId }).populate(
    'items.productId',
  );

  if (!cart) {
    throw createHttpError(404, 'Cart not found for this user');
  }

  return cart.items;
};

export const addItemToCart = async (payload, userId) => {
  const { productId, quantity } = payload;

  if (!productId || !quantity || quantity < 1) {
    throw createHttpError(400, 'Invalid product data');
  }

  let cart = await CartCollection.findOne({ userId });

  if (!cart) {
    cart = await CartCollection.create({
      userId,
      items: [{ productId, quantity }],
    });
    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  return cart;
};

export const patchCartItem = async (userId, { productId, quantity }) => {
  const cart = await CartCollection.findOne({ userId });

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw createHttpError(404, 'Item not found in cart');
  }

  cart.items[itemIndex].quantity = quantity;

  await cart.save();

  return cart.items[itemIndex];
};

export const deleteCartItem = async (userId, productId) => {
  const cart = await CartCollection.findOne({ userId });

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw createHttpError(404, 'Item not found in cart');
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();

  return cart;
};

export const clearCart = async (userId) => {
  await CartCollection.findOneAndUpdate({ userId }, { $set: { items: [] } });
};

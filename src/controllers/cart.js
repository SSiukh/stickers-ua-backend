import {
  addItemToCart,
  deleteCartItem,
  getCartItems,
  patchCartItem,
} from '../services/cart.js';

export const getCartDataController = async (req, res) => {
  const userId = req.user._id;
  const cart = await getCartItems(userId);

  res.json({
    status: 200,
    message: 'Successfully recieve cart items',
    data: cart,
  });
};
export const addToCartController = async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;

  const cart = await addItemToCart(payload, userId);

  res.status(201).json({
    status: 201,
    message: 'Successfully add an item',
    data: cart,
  });
};
export const patchCartItemController = async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;

  const cart = await patchCartItem(userId, payload);

  res.json({
    status: 200,
    message: 'Successfully update an item',
    data: cart,
  });
};
export const deleteCartItemController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  await deleteCartItem(userId, productId);

  res.sendStatus(204);
};

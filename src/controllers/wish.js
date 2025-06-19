import {
  addItemToWish,
  deleteWishItem,
  getWishItems,
} from '../services/wish.js';

export const getWishDataController = async (req, res) => {
  const userId = req.user._id;
  const wish = await getWishItems(userId);

  res.json({
    status: 200,
    message: 'Successfully recieve wish items',
    data: wish,
  });
};
export const addToWishController = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const wish = await addItemToWish(userId, productId);

  res.status(201).json({
    status: 201,
    message: 'Successfully add an item',
    data: wish,
  });
};

export const deleteWishItemController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  await deleteWishItem(userId, productId);

  res.sendStatus(204);
};

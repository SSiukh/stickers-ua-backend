import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const cartRouter = Router();

// get, add, patch quantity, delete item

cartRouter.get(
  '/',
  authenticate,
  // ctrlWrapper(getCartDataController)
);

cartRouter.post(
  '/add',
  //   validateBody(addToCartSchema),
  authenticate,
  //   ctrlWrapper(addToCartController),
);

cartRouter.patch(
  '/update',
  //   validateBody(patchCartItemSchema),
  authenticate,
  //   ctrlWrapper(patchCartItemController),
);

cartRouter.delete(
  '/remove/:productId',
  //   validateBody(deleteCartItemSchema),
  authenticate,
  //   ctrlWrapper(deleteCartItemController),
);

export default cartRouter;

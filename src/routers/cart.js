import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addToCartController,
  clearCartController,
  deleteCartItemController,
  getCartDataController,
  patchCartItemController,
} from '../controllers/cart.js';
import { addToCartSchema, patchCartItemSchema } from '../validation/cart.js';

const cartRouter = Router();

cartRouter.get('/', authenticate, ctrlWrapper(getCartDataController));

cartRouter.post(
  '/add',
  validateBody(addToCartSchema),
  authenticate,
  ctrlWrapper(addToCartController),
);

cartRouter.patch(
  '/update',
  validateBody(patchCartItemSchema),
  authenticate,
  ctrlWrapper(patchCartItemController),
);

cartRouter.delete(
  '/remove/:productId',
  authenticate,
  ctrlWrapper(deleteCartItemController),
);

cartRouter.delete('/remove', authenticate, ctrlWrapper(clearCartController));

export default cartRouter;

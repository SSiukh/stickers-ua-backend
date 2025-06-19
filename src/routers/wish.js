import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { addToWishSchema } from '../validation/wish.js';
import {
  addToWishController,
  deleteWishItemController,
  getWishDataController,
} from '../controllers/wish.js';

const wishRouter = Router();

wishRouter.get('/', authenticate, ctrlWrapper(getWishDataController));

wishRouter.post(
  '/add',
  validateBody(addToWishSchema),
  authenticate,
  ctrlWrapper(addToWishController),
);

wishRouter.delete(
  '/remove/:productId',
  authenticate,
  ctrlWrapper(deleteWishItemController),
);

export default wishRouter;

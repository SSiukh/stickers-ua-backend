import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStickerController,
  deleteStickerController,
  getStickersByIdController,
  getStickersController,
  updateStickerController,
} from '../controllers/stickers.js';
import {
  createStickerSchema,
  updateStickerSchema,
} from '../validation/stickers.js';
import { upload } from '../middlewares/multer.js';
import { checkManager } from '../middlewares/checkManager.js';
import { ROLES } from '../constants/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { parseJSONFields } from '../middlewares/parseJSONFields.js';

const stickersRouter = Router();

stickersRouter.get('/', ctrlWrapper(getStickersController));

stickersRouter.get('/:productId', ctrlWrapper(getStickersByIdController));

stickersRouter.post(
  '/',
  authenticate,
  checkManager(ROLES.MANAGER),
  upload.single('photo'),
  parseJSONFields(['type']),
  validateBody(createStickerSchema),
  ctrlWrapper(createStickerController),
);

stickersRouter.patch(
  '/:productId',
  authenticate,
  checkManager(ROLES.MANAGER),
  parseJSONFields(['type']),
  validateBody(updateStickerSchema),
  ctrlWrapper(updateStickerController),
);

stickersRouter.delete(
  '/:productId',
  authenticate,
  checkManager(ROLES.MANAGER),
  ctrlWrapper(deleteStickerController),
);

export default stickersRouter;

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStickerController,
  getStickersByIdController,
  getStickersController,
} from '../controllers/stickers.js';
import { createStickerSchema } from '../validation/stickers.js';
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

export default stickersRouter;

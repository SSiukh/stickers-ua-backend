import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStickerController,
  getStickersController,
} from '../controllers/stickers.js';
import { createStickerSchema } from '../validation/stickers.js';
import { upload } from '../middlewares/multer.js';

const stickersRouter = Router();

stickersRouter.get('/', ctrlWrapper(getStickersController));

stickersRouter.post(
  '/',
  upload.single('photo'),
  validateBody(createStickerSchema),
  ctrlWrapper(createStickerController),
);

export default stickersRouter;

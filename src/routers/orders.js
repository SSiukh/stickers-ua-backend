import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkManager } from '../middlewares/checkManager.js';
import { ROLES } from '../constants/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  deleteOrderController,
  getOrdersController,
  setCompletedOrderController,
} from '../controllers/orders.js';

const ordersRouter = Router();

ordersRouter.get(
  '/',
  authenticate,
  checkManager(ROLES.MANAGER),
  ctrlWrapper(getOrdersController),
);

ordersRouter.patch(
  '/:orderId',
  authenticate,
  checkManager(ROLES.MANAGER),
  ctrlWrapper(setCompletedOrderController),
);

ordersRouter.delete(
  '/:orderId',
  authenticate,
  checkManager(ROLES.MANAGER),
  ctrlWrapper(deleteOrderController),
);

export default ordersRouter;

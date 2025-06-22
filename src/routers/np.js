import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createInvoiceController,
  getInvoicesController,
  getLocationsController,
  getWarehousesController,
} from '../controllers/np.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkManager } from '../middlewares/checkManager.js';
import { ROLES } from '../constants/index.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createInvoiceSchema } from '../validation/np.js';

const npRouter = Router();

npRouter.get('/locations', ctrlWrapper(getLocationsController));

npRouter.get('/warehouses', ctrlWrapper(getWarehousesController));

npRouter.post(
  '/create',
  validateBody(createInvoiceSchema),
  ctrlWrapper(createInvoiceController),
);

npRouter.get(
  '/invoices',
  authenticate,
  checkManager(ROLES.MANAGER),
  ctrlWrapper(getInvoicesController),
);

export default npRouter;

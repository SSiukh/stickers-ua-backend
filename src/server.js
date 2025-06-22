import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import stickersRouter from './routers/stickers.js';
import authRouter from './routers/auth.js';
import cartRouter from './routers/cart.js';
import wishRouter from './routers/wish.js';
import npRouter from './routers/np.js';
import ordersRouter from './routers/orders.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    // origin: getEnvVar('ALLOWED_DOMAIN'),
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use('/stickers', stickersRouter);
  app.use('/auth', authRouter);
  app.use('/cart', cartRouter);
  app.use('/wish', wishRouter);
  app.use('/np', npRouter);
  app.use('/orders', ordersRouter);

  app.get('/', async (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Hello world!',
    });
  });

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

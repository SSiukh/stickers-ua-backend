import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getAllLocations } from './services/np.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import stickersRouter from './routers/stickers.js';
import authRouter from './routers/auth.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: getEnvVar('ALLOWED_DOMAIN'),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use('/stickers', stickersRouter);
  app.use('/auth', authRouter);

  app.get('/', async (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Hello world!',
    });
  });

  app.get('/locations', async (req, res) => {
    const { cityName, limit, page } = req.query;
    const locations = await getAllLocations(cityName, limit, page);

    res.status(200).json({
      status: 200,
      data: locations,
    });
  });

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

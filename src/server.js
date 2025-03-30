import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllLocations } from './services/np.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

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

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

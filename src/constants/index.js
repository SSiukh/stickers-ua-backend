import path from 'node:path';

export const ROLES = {
  CUSTOMER: 'customer',
  MANAGER: 'manager',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

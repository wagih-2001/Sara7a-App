import dotenv from 'dotenv';
import { resolve } from 'node:path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envpath = {
  development: ' dev.env ',
  stagn: 'stagn.dev',
  production: 'prod.env'
};

dotenv.config({ path: resolve(`./config/${envpath.development.trim()}`) });

export const PORT = process.env.PORT || 5000;
export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/sara7a';

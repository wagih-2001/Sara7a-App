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
export const DB_URI = process.env.DB_URI;
export const SALT_ROUND = process.env.SALT_ROUND || 10;

// TOKEN USER
export const ACCESS_TOKEN_USER_SECRET = process.env.ACCESS_TOKEN_USER_SECRET;
export const REFRESH_TOKEN_USER_SECRET = process.env.REFRESH_TOKEN_USER_SECRET;
export const ACCESS_TOKEN_USER_EXPIRES_In =
  process.env.ACCESS_TOKEN_USER_EXPIRES_In;
export const REFRESH_TOKEN_USER_EXPIRES_In =
  process.env.REFRESH_TOKEN_USER_EXPIRES_In;

// TOKEN ADMIN
export const ACCESS_TOKEN_ADMIN_SECRET = process.env.ACCESS_TOKEN_ADMIN_SECRET;
export const REFRESH_TOKEN_ADMIN_SECRET =
  process.env.REFRESH_TOKEN_ADMIN_SECRET;
export const ACCESS_TOKEN_ADMIN_EXPIRES_In =
  process.env.ACCESS_TOKEN_ADMIN_EXPIRES_In;
export const REFRESH_TOKEN_ADMIN_EXPIRES_In =
  process.env.REFRESH_TOKEN_ADMIN_EXPIRES_In;

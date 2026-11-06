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
export const ENC_KEY = process.env.ENC_KEY;

// EMAIL CONFIG
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

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

export const WHITE_LISTED_URLS = process.env.WHITE_LISTED_URLS;

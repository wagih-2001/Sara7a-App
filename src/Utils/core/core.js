import cors from 'cors';


import { WHITE_LISTED_URLS } from '../../../config/config.service.js';
import { ForbiddenErrorException } from '../response/error.response.js';

const whiteListedUrls = WHITE_LISTED_URLS.split(',')
  .map(url => url.trim())
  .filter(Boolean);

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman, Curl and server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Allow only trusted origins
    if (whiteListedUrls.includes(origin)) {
      return callback(null, true);
    }

    return callback(ForbiddenErrorException('Not allowed by CORS'));
  },

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export const corsMiddleware = cors(corsOptions);

import { Router } from 'express';

import {
  getProfile,
  uploadProfilePicture,
  uploadCoverPictures
} from './user.service.js';

import { authentication } from '../../Middlewares/authentication.middleware.js';

import {
  uploadProfilePicture as profilePictureMiddleware,
  uploadCoverPictures as coverPicturesMiddleware
} from '../../Middlewares/user.upload.middleware.js';

const router = Router();

router.get('/profile', authentication(), getProfile);

router.patch(
  '/profile-picture',
  authentication(),
  profilePictureMiddleware,
  uploadProfilePicture
);

router.patch(
  '/cover-pictures',
  authentication(),
  coverPicturesMiddleware,
  uploadCoverPictures
);

export default router;

import {
  localFileUpload,
  fileValidation
} from '../Utils/multer/local.multer.js';

export const uploadProfilePicture = localFileUpload({
  customPath: 'users/profile',
  validation: fileValidation.images
}).single('profilepic');

export const uploadCoverPictures = localFileUpload({
  customPath: 'users/cover',
  validation: fileValidation.images
}).array('coverpic', 5);

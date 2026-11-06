import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

export const fileValidation = {
  images: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  videos: ['video/mp4', 'video/mkv', 'video/avi'],
  audios: ['audio/mpeg', 'audio/wav'],
  documents: ['application/pdf', 'application/msword']
};
export const localFileUpload = ({
  customPath = 'general',
  validation = []
}) => {
  const basePath = `uploads/${customPath}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let userBasePath = basePath;
      if (req.user?._id) userBasePath += `/${req.user._id}`;
      const fullpath = path.resolve(`./src/${userBasePath}`);
      if (!fs.existsSync(fullpath)) fs.mkdirSync(fullpath, { recursive: true });
      cb(null, path.resolve(fullpath));
    },
    filename: (req, file, cb) => {
      const uniqueFileName =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        '-' +
        file.originalname;
      file.finalPath = `${basePath}/${req.user?._id ? req.user._id + '/' : ''}${uniqueFileName}`;
      cb(null, uniqueFileName);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(new Error('Invalid file type'), false);
    }
  };
  return multer({
    fileFilter,
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5 MB
    }
  });
};

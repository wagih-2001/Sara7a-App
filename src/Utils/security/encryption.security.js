import crypto from 'node:crypto';
import { ENC_KEY } from '../../../config/config.service.js';

const IV_LENGTH = 16;
const ENCRYPTIONS_SECRET_KEY = Buffer.from(ENC_KEY);

export const encrypt = text => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    ENCRYPTIONS_SECRET_KEY,
    iv
  );
  let encryptionData = cipher.update(text, 'utf-8', 'hex');
  encryptionData += cipher.final('hex');
  return `${iv.toString('hex')}:${encryptionData}`;
};

export const decrypt = encryptionData => {
  const [ivHex, encryptionText] = encryptionData.split(':');
  const binaryLikeIv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTIONS_SECRET_KEY,
    binaryLikeIv
  );
  let decryptionData = decipher.update(encryptionText, 'hex', 'utf-8');
  decryptionData += decipher.final('utf-8');
  return decryptionData;
};

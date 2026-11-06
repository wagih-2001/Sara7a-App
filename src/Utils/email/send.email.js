import { BadRequestErrorException } from '../response/error.response.js';
import { createTransport } from 'nodemailer';

import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD
} from '../../../config/config.service.js';

export const sendEmail = async data => {
  // Validate Email Content
  if (!data.html && !data.attachments?.length && !data.text) {
    throw new BadRequestErrorException('Missing Email Content');
  }

  // Validate Email Configuration
  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USERNAME || !EMAIL_PASSWORD) {
    throw new BadRequestErrorException('Email Configuration Is Missing');
  }

  // Create Transporter
  const transporter = createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  });

  // Send Email
  const info = await transporter.sendMail({
    ...data,
    from: `"Sara7aApp" <${EMAIL_USERNAME}>`
  });

  return info;
};

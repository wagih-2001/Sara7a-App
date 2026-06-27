import { compare, hash } from 'bcrypt';
import { SALT_ROUND } from '../../../config/config.service.js';
import { HashEnum } from '../enums/security.enums.js';
import * as argon2 from 'argon2';
import { BadRequestErrorException } from '../response/error.response.js';

export const generateHash = async ({
  plaintext,
  saltRounds = Number(SALT_ROUND),
  algorithm = HashEnum.Bycrpt
}) => {
  let hashResults = '';
  switch (algorithm) {
    case HashEnum.Bycrpt:
      hashResults = await hash(plaintext, saltRounds);
      break;
    case HashEnum.Argon2:
      hashResults = await argon2.hash(plaintext);
      break;
    default:
      throw BadRequestErrorException('Unsupport hashing algorithm');
  }
  return hashResults;
};

export const compareHash = async ({
  plaintext,
  ciphertext,
  algorithm = HashEnum.Bycrpt
}) => {
  let match = false;
  switch (algorithm) {
    case HashEnum.Bycrpt:
      match = await compare(plaintext, ciphertext);
      break;
    case HashEnum.Argon2:
      match = await argon2.verify(ciphertext, plaintext);
      break;
    default:
      throw BadRequestErrorException('Unsupport hashing algorithm');
  }
  return match;
};

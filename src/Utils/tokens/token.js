import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_ADMIN_EXPIRES_In,
  ACCESS_TOKEN_ADMIN_SECRET,
  ACCESS_TOKEN_USER_EXPIRES_In,
  ACCESS_TOKEN_USER_SECRET,
  REFRESH_TOKEN_ADMIN_EXPIRES_In,
  REFRESH_TOKEN_ADMIN_SECRET,
  REFRESH_TOKEN_USER_EXPIRES_In,
  REFRESH_TOKEN_USER_SECRET
} from '../../../config/config.service.js';
import { RoleEnum, SignatureEnum } from '../enums/user.enums.js';
export const generateToken = ({ payload, secreKey, options }) => {
  return jwt.sign(payload, secreKey, options);
};

export const verifyToken = ({ token, secreKey }) => {
  return jwt.verify(token, secreKey);
};
export const getSignature = ({ SignatureLevel = SignatureEnum.user }) => {
  let signature = { accessSignature: undefined, refreshSignature: undefined };
  switch (SignatureLevel) {
    case SignatureEnum.Admin:
      signature.accessSignature = ACCESS_TOKEN_ADMIN_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_ADMIN_SECRET;
      break;
    case SignatureEnum.User:
      signature.accessSignature = ACCESS_TOKEN_USER_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_USER_SECRET;
      break;
    default:
      signature.accessSignature = ACCESS_TOKEN_ADMIN_SECRET;
      signature.refreshSignature = REFRESH_TOKEN_ADMIN_SECRET;
      break;
  }
  return signature;
};

export const getNewLoginCredentials = async user => {
  const signature = await getSignature({
    SignatureLevel:
      user.role != RoleEnum.Admin ? SignatureEnum.User : SignatureEnum.Admin
  });
  const accessToken = generateToken({
    payload: { id: user._id },
    secreKey: signature.accessSignature,
    options: {
      expiresIn:
        user.role != RoleEnum.Admin
          ? Number(ACCESS_TOKEN_USER_EXPIRES_In)
          : Number(ACCESS_TOKEN_ADMIN_EXPIRES_In)
    }
  });
  const refreshToken = generateToken({
    payload: { id: user._id },
    secreKey: signature.refreshSignature,
    options: {
      expiresIn:
        user.role != RoleEnum.Admin
          ? Number(REFRESH_TOKEN_USER_EXPIRES_In)
          : Number(REFRESH_TOKEN_ADMIN_EXPIRES_In)
    }
  });
  return { accessToken, refreshToken };
};

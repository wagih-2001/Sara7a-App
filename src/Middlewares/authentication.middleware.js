import { findById } from '../DB/database.repository.js';
import UserModel from '../DB/models/user.model.js';
import { SignatureEnum, TokenTypeEnum } from '../Utils/enums/user.enums.js';
import {
  ForbiddenErrorException,
  NotFoundErrorException
} from '../Utils/response/error.response.js';
import { getSignature, verifyToken } from '../Utils/tokens/token.js';

export const decodedToken = async ({
  authorization,
  tokenType = TokenTypeEnum.Access
}) => {
  if (!authorization) {
    throw new Error('Authorization header missing');
  }

  const [Bearer, token] = authorization.split(' ') || [];

  if (!token) {
    throw new Error('Token missing or invalid format');
  }

  let signature = await getSignature({
    SignatureLevel:
      Bearer === 'ADMIN'
        ? SignatureEnum.Admin
        : Bearer === 'USER'
          ? SignatureEnum.User
          : (() => {
              throw new Error('Invalid Signature');
            })()
  });

  const decoded = verifyToken({
    token,
    secreKey:
      tokenType === TokenTypeEnum.Access
        ? signature.accessSignature
        : signature.refreshSignature
  });

  const user = await findById({ model: UserModel, id: decoded.id });

  if (!user) throw NotFoundErrorException('User Not Found ');

  return [user, decoded];
};

export const authentication = ({ tokenType = TokenTypeEnum.Access }) => {
  return async (req, res, next) => {
    const [user, decoded] =
      (await decodedToken({
        authorization: req.headers.authorization,
        tokenType
      })) || [];

    req.decoded = decoded;
    req.user = user;

    return next();
  };
};

export const authorization = ({ accessRole = [] }) => {
  return async (req, res, next) => {
    if (!accessRole.includes(req.user.role))
      throw ForbiddenErrorException('Unauthorization Access');

    return next();
  };
};

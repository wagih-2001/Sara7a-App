import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { create, findOne } from '../../DB/database.repository.js';
import UserModel from '../../DB/models/user.model.js';
import { HashEnum } from '../../Utils/enums/security.enums.js';
import { ConflictErrorException } from '../../Utils/response/error.response.js';
import { successResponse } from '../../Utils/response/success.response.js';
import {
  compareHash,
  generateHash
} from '../../Utils/security/hash.security.js';
import {
  generateToken,
  getNewLoginCredentials
} from '../../Utils/tokens/token.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  if (await findOne({ model: UserModel, filter: { email } }))
    throw ConflictErrorException('User already exists with this email');

  // Hash Password
  const hashPassword = await generateHash({
    plaintext: password,
    algorithm: HashEnum.Bycrpt
  });

  // Create a new user
  const user = await create({
    model: UserModel,
    data: [{ username, email, password: hashPassword }]
  });
  successResponse({
    res,
    statusCode: 201,
    message: 'User created successfully',
    data: { user }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOne({
    model: UserModel,
    filter: { email },
    select: 'firstName lastName username email password'
  });
  if (!user) throw ConflictErrorException('User not found with this email');

  const isMatch = await compareHash({
    plaintext: password,
    ciphertext: user.password,
    algorithm: hash.Bycrpt
  });

  if (!isMatch) throw ConflictErrorException('invalid credentials');

  const tokens = await getNewLoginCredentials(user);

  successResponse({
    res,
    statusCode: 201,
    message: 'User logged in successfully',
    data: { tokens }
  });
};

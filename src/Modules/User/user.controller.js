import { Router } from 'express';
import * as userService from './user.service.js';
import { RoleEnum, TokenTypeEnum } from '../../Utils/enums/user.enums.js';
import {
  authentication,
  authorization
} from '../../Middlewares/authentication.middleware.js';

const router = Router();

router.get(
  '/profile',
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.User] }),
  userService.getProfile
);

export default router;

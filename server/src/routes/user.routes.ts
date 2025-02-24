import { Router } from 'express';

import { validateData } from '../middlewares';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller';
import { loginUserSchema, registerUserSchema } from '../schemas/userSchema';
import authRequired from '../middlewares/authRequired.middleware';

const router = Router();

router.post('/register', validateData(registerUserSchema), registerUser);
router.post('/login', validateData(loginUserSchema), loginUser);
router.get('/logout', authRequired, logoutUser);

export default router;

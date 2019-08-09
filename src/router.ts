import * as express from 'express';
import { traineeRouter } from './controllers';
import { userRouter } from './controllers';
const router = new  express.Router();
router.use('/trainee', traineeRouter);
router.use('/user', userRouter);
export default router;

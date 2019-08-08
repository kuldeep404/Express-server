import * as express from 'express';
import { userController } from './Controller';
const userRouter = express.Router();
userRouter.route('/')
    .get( userController.get)
    .post(userController.create)
    .put( userController.update)
    .delete(userController.delete);
export default userRouter;

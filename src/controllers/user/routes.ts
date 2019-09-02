import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import UserController from './Controller';
import validation from './validation';
const userRouter = express.Router();
userRouter.route('/login')
    .post(validationHandler(validation.create), UserController.login );
userRouter.route('/me')
    .get(authmiddleware('getUsers', 'all' ), UserController.getUser);
export default userRouter;

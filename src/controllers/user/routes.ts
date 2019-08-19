import * as bcrypt from 'bcrypt';
import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import UserController from './Controller';
import validation from './validation';
const userRouter = express.Router();
userRouter.route('/login')
    // .get( userController.get)
    .post(validationHandler(validation.create), UserController.login );
    // .put( userController.update)
    // .delete(userController.delete);
userRouter.route('/me')
    .get(authmiddleware('getUsers', 'all' ), UserController.getUser);
userRouter.route('/update')
    .put(validationHandler(validation.update), UserController.updateUser);
userRouter.route('/delete/:id')
    .delete( validationHandler(validation.delete), UserController.deleteUser);
export default userRouter;

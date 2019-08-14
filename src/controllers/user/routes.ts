import * as bcrypt from 'bcrypt';
import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import UserController from './Controller';
const userRouter = express.Router();
userRouter.route('/login')
    // .get( userController.get)
    .post(UserController.login );
    // .put( userController.update)
    // .delete(userController.delete);
userRouter.route('/me')
    .get(authmiddleware('getUsers', 'all' ), UserController.getUser);
userRouter.route('/update')
    .put( UserController.updateUser);
userRouter.route('/delete/:id')
    .delete( UserController.deleteUser);
export default userRouter;

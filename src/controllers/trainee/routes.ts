import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import { traineeController } from './Controller';
import validation from './validation';

const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authmiddleware('getUsers', 'read'), traineeController.get)
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update)
    .delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;

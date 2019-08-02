import * as express from 'express';
import { traineeController } from './Controller';
import validation from './validation';
import validationHandler from '../../libs/validationHandler';
const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(validationHandler(validation.get), traineeController.get)
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update)
    .delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;

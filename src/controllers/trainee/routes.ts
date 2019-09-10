import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import TraineeController from './Controller';
import validation from './validation';

const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authmiddleware('getUsers', 'all'), validationHandler(validation.get), TraineeController.get)
    .post(authmiddleware('getUsers', 'write'), validationHandler(validation.create), TraineeController.create)
    .put(authmiddleware('getUsers', 'write'), validationHandler(validation.update), TraineeController.updateTrainee);
traineeRouter.route('/:id')
    .delete(authmiddleware('getUsers', 'delete'), validationHandler(validation.delete),
    TraineeController.deleteTrainee);
export default traineeRouter;

import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import TraineeController from './Controller';
import validation from './validation';

const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authmiddleware('getUsers', 'all'), validationHandler(validation.get), TraineeController.get)
    .post(authmiddleware('getUsers', 'all'), validationHandler(validation.create), TraineeController.create)
    .put(authmiddleware('getUsers', 'all'), validationHandler(validation.update), TraineeController.updateTrainee);
traineeRouter.route('/delete/:id')
    .delete(authmiddleware('getUsers', 'all'), validationHandler(validation.delete), TraineeController.deleteTrainee);
export default traineeRouter;

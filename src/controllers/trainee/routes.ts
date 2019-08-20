import * as express from 'express';
import authmiddleware from '../../libs/routes/authmiddleware';
import validationHandler from '../../libs/validationHandler';
import TraineeController from './Controller';
import validation from './validation';
// import router from 'src/router';
const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authmiddleware('getUsers', 'all'), TraineeController.get)
    .post(validationHandler(validation.create), TraineeController.create)
    .put(validationHandler(validation.update), TraineeController.updateTrainee);
traineeRouter.route('/delete/:id').delete(validationHandler(validation.delete), TraineeController.deleteTrainee);
export default traineeRouter;

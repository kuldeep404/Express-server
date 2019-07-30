import * as express from 'express';
import { traineeController } from './Controller';
const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(traineeController.get)
    .post(traineeController.create)
    .put(traineeController.update)
    .delete(traineeController.delete);
export default traineeRouter;

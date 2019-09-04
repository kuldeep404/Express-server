import * as bcrypt from 'bcrypt';
import { userModel } from '../../repositories/user/UserModel';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class TraineeController {
    public async get(req, res, next) {
        try {
            const traineeList = await userRepository.getAll({ role: 'trainee', deletedAt: { $exists: false } },
            undefined, req.query);
            const count: number = traineeList.length;
            res.send({
                data: traineeList,
                count,
                message: 'all trainees fetched',
                status: 200,
            });
        }
        catch (error) {
            next({
                error: ' Fetching Unable ',
                message: ' Error in fetching data',
                status: 404,
            });
        }
    }
    public async create(req, res, next ) {
        try {
            const { email } = req.body;
            userModel.countDocuments({ email }, async (err, count) => {
                if (count === 0) {
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(req.body.password, salt);
                    req.body.password = hash;

                    const data = {
                        role: 'trainee',
                        userId: req.user,
                        ...req.body,
                    };
                    const createTrainee = await userRepository.create(data);
                    delete createTrainee.__v;
                    const dataOne = Object.defineProperty(createTrainee, 'password', { enumerable: false });
                    res.send({
                        data: dataOne,
                        message: 'trainee create successful',
                        status: 200,
                    });
                }
                else {
                    next({
                        error: 'Invalid email',
                        message: 'user already exists',
                        status: 400,
                    });
                }
            });
        }
        catch (error) {
            next({
                error: 'Invalid Details ',
                message: 'Details must be in proper format',
                status: 404,
            });
        }
    }

    public async updateTrainee(req , res, next) {
        try {
            const { dataToUpdate, id } = req.body;
            const updateTrainee = await userRepository.update(
                {_id: id}, dataToUpdate,
            );
            if (updateTrainee) {
                return res.send({
                    message: 'Trainee update  successfully',
                    status: 200,
                    data: { id },
                });
            }
        }
        catch (error) {
            next({
                error: 'Invalid id',
                message: 'id not found for update ',
                status: 404,
            });
        }
    }
    public async deleteTrainee(req, res, next) {
        try {
            const { id } = req.params;
            const result = await userRepository.delete({_id: id});
            if (result) {
                return res.send({
                    data: id,
                    message: ' delete   successfully',
                    status: 200,
                });
            }
        }
        catch (error) {
            next({
                error: 'Invalid id ',
                message: 'id not found for delete',
                status: 404,
            });
        }
    }
}
const traineeController = new TraineeController();
export default traineeController;

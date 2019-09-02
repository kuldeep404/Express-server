import * as bcrypt from 'bcrypt';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class TraineeController {
    public async get(req, res, next) {
        try {
            const traineeList = await userRepository.getAll({ role: 'trainee', deletedAt: { $exists: false } },
            undefined, req.query);
            const count: number = traineeList.length;
            console.log('inside get trainee');
            res.send({
                data: traineeList,
                count,
                message: 'all trainees fetched',
                status: 200,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    public async create(req, res, next ) {
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            const data = {
                role: 'trainee',
                userId: 'kuldeep',
                ...req.body,
            };
            const createTrainee = await userRepository.create(data);
            res.send({
                data: createTrainee,
                message: 'trainee create successful',
                status: 200,
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
            const updateTrainee = await userRepository.update(
                {_id: req.body.id},
                req.body.dataToUpdate,
            );
            if (updateTrainee) {
                return res.send({
                    message: 'Trainee update  successfully',
                    status: 200,
                    data: { id: req.body.id },
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
            const result = await userRepository.delete({_id: req.params.id});
            if (result) {
                return res.send({
                    data: req.params.id,
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

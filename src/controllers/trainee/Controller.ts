import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class TraineeController {
    public async get(req, res) {
        const traineeList = await userRepository.getAll({ role: 'trainee', deletedAt: { $exists: false } },
        undefined, req.query);
        const count: number = traineeList.length;
        console.log('inside get trainee');
        res.send([{
            data: traineeList,
            count,
            message: 'all trainees fetched',
            status: 200,
        },
        ]);
    }
    public async create(req, res) {
        console.log('inside create trainee');
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
            data: {
                name: createTrainee,
            },
                message: 'trainee create successful',
                status: 'ok',
        });
    }
    public async updateTrainee(req , res, next) {
        const updateTrainee = await userRepository.update (
            {_id: req.body.id},
            req.body.dataToUpdate,
        );
        if (updateTrainee === ' not found') {
            next ({
                message: updateTrainee,
                status: 403,
            });
        }
        else {
            next({
                message: 'Trainee update  successfully',
                status: 200,
            });
        }
    }
    public async deleteTrainee(req, res, next) {
        try {
            const deleteTrainee = await userRepository.delete({_id: req.params.id});
            if ( deleteTrainee === 'not found in delete') {
                next({
                    message: deleteTrainee,
                    status: 404,
                });
            }
            else {
                res.send({
                data: req.params.id,
                message: 'User delete   successfully',
                status: 200,
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    public getTrainee( req, res) {
        res.send({
            data: req.user,
            message: 'Successfully fetched Trainees',
            status: 'ok',
        });
    }
}
const traineeController = new TraineeController();
export default traineeController;

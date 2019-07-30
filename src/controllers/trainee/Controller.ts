import { Request, Response } from 'express';
class TraineeController {
    public get(req: Request , res: Response) {
        res.send({
            id: 1,
            name: 'trainee1',
        });
    }
    public create(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE CREATE');
        res.send({
            data: {
                id: 1,
                name: 'trainee1',
            },
            message: 'Trainee created successfully',
            status: 'OK',
        });
    }
    public delete(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE DELETE');
        res.send({
            data: {
                id: 1,
                name: 'trainee1',
            },
            message: 'Trainee delete successfully',
            status: 'OK',
        });
    }
    public update(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE UPDATE');
        res.send({
            data: {
                id: 1,
                name: 'trainee1',
            },
            message: 'Trainee update successfully',
            status: 'OK',
        });
    }
}
export const traineeController = new TraineeController();

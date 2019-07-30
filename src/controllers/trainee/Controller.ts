import { Request, Response } from 'express';
import successHandler from '../../libs/routes/successHandler';
const data= {
    id: 1,
    name: 'trainee1',
}
class TraineeController {
    
    public get(req: Request , res: Response) {
        return res.send(successHandler(data,'Trainee get successfully',200));

    }
    public create(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE CREATE');
        return res.send(successHandler(data,'Trainee created successfully',200));

    }
    public delete(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE DELETE');
        return res.send(successHandler(data,'Trainee deleted successfully',200));

    }
    public update(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE UPDATE');
        return res.send(successHandler(data,'Trainee update successfully',200));

    }
}
export const traineeController = new TraineeController();

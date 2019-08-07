import { Request, Response } from 'express';
import successHandler from '../../libs/routes/successHandler';
const data = {
    id: 1,
    name: 'trainee1',
};
class UserController {    
    public get(req: Request , res: Response) {
        return res.send(successHandler(data,'Trainee get successfully',400));
    }
    public create(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE CREATE');
        return res.send(successHandler(data,'Trainee created successfully',400));
    }
    public delete(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE DELETE');
        return res.send(successHandler(data,'Trainee deleted successfully',400));
    }
    public update(req: Request , res: Response) {
        // console.log('INSIDE TRAINEE UPDATE');
        return res.send(successHandler(data,'Trainee update successfully',404));
    }
}
export const userController = new UserController();
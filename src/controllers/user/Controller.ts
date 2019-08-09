import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class UserController {
    public getUser( req, res) {
        // console.log('user is----->',req.user);
        res.send({
            data: req.user,
            message: 'User fetch successfully',
            status: 'ok',
        });
    }
    public login(req, res, next) {
        console.log('inside login request ::::', req.body);
        const{ email, password } = req.body;
        userRepository.findOne('{ email: email }')
        .then((user) => {
            console.log('User is :::::', user);
            if (!user) {
                return next('User Not found');
            }
            const {  password : hashPassword } = user;
            // console.log('>>>>>>>>>>>>>>>>>>',password,hashPassword,user)
            if (!(bcrypt.compareSync(password , hashPassword))) {
                return next('password does not match');
            }
            const token = jwt.sign(user, config.secretKey);
            // console.log('Token is ::::', token);
            // console.log('User Response', user);
            res.send({
                data: {
                    token,
                },
                message: 'Login Successfully',
                status: 'ok',
            });
        });
    }
}
const userController = new UserController();
export default userController;
// import successHandler from '../../libs/routes/successHandler';
// const data = {
//     id: 1,
//     name: 'trainee1',
// };
// class UserController {
//     public get(req: Request , res: Response) {
//         return res.send(successHandler(data, 'Trainee get successfully',  400));
//     }
//     public create(req: Request , res: Response) {
//         // console.log('INSIDE TRAINEE CREATE');
//         return res.send(successHandler(data, 'Trainee created successfully', 400));
//     }
//     public delete(req: Request , res: Response) {
//         // console.log('INSIDE TRAINEE DELETE');
//         return res.send(successHandler(data, 'Trainee deleted successfully', 400));
//     }
//     public update(req: Request , res: Response) {
//         // console.log('INSIDE TRAINEE UPDATE');
//         return res.send(successHandler(data, 'Trainee update successfully', 404));
//     }
// }

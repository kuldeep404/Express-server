import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class UserController {
        public updateUser(req , res, next) {
        userRepository.update (
            {_id: req.body.id},
            req.body.dataToUpdate,
        ).then((result) => {
            if (result === 'user not found') {
                next ({
                    message: result,
                    status: 404,
                });
            }
            else {
                next({
                    // data: req.body.dataToUpdate,
                    message: 'User update  successfully',
                    status: 200,
                });
            }
            // res.send({
            //     data: req.body.dataToUpdate,
            //     message: 'User update  successfully',
            //     status: 'ok',
            // });
        });
    }
    public deleteUser(req, res, next) {
        userRepository.delete({_id: req.params.id})
            .then((result) => {
                if (result === ' user not found in delete ') {
                    next({
                        message: result,
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
        });
    }
    public getUser( req, res) {
        // console.log('user is----->',req.user);
        res.send({
            data: req.user,
            message: 'User fetch successfully',
            status: 200,
        });
    }
    public login(req, res, next) {
        console.log('inside login request ::::', req.body);
        const{ email, password } = req.body;
        userRepository.findOne({ email })
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
                status: 200,
            });
        });
    }
}
const userController = new UserController();
export default userController;

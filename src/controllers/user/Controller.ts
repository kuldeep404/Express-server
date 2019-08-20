import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class UserController {
    public async updateUser(req , res, next) {
        try {
            const updateUser = await userRepository.update (
                {_id: req.body.id},
                req.body.dataToUpdate,
            );
            if (updateUser === ' not found') {
                next ({
                    message: updateUser,
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
        } catch (e) {
            console.error(e);
        }
    }
    public async deleteUser(req, res, next) {
        try {
            const deleteUser = await userRepository.delete({_id: req.params.id});
            if (deleteUser === ' not found in delete ') {
                next({
                    message: deleteUser,
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
    public getUser( req, res) {
        console.log('user is----->', req);
        res.send({
            message: 'Me',
            status: 'ok',
            data: req.user,
        });
    }
    public async login(req, res, next) {
        // console.log('inside login request ::::', req.body);
        try {
            const{ email, password } = req.body;
            const userlogin = await userRepository.findOne({ email });
            // console.log('User is :::::', userlogin);
            if (!userlogin) {
                return next('User Not found');
            }
            const {  password : hashPassword } = userlogin;
            if (!(bcrypt.compareSync(password , hashPassword))) {
                return next('password does not match');
            }
            const token = jwt.sign(userlogin, config.secretKey, {expiresIn: '15m'});
            // console.log('Token is ::::', token);
            // console.log('User Response', user);
            res.send({
                message: 'Authorization Token',
                status: 200,
                data: token,
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}
const userController = new UserController();
export default userController;

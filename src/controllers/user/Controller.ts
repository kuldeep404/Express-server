import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../repositories/user/UserRepository';
const userRepository = new UserRepository();
class UserController {
    public getUser( req, res) {
        res.send({
            message: 'user get successfully ',
            status: 200,
            data: req.user,
        });
    }
    public async login(req, res, next) {
        try {
            const{ email, password } = req.body;
            const userlogin = await userRepository.findOne({ email });
            if (!userlogin  ) {
                return next({
                    error: 'Invalid Credetial',
                    message: ' Incorrect email',
                    status: 401,
                });
            }
            const {  password : hashPassword } = userlogin;
            if (!(bcrypt.compareSync(password , hashPassword))) {
                return next({
                        error: 'Invalid Credetial',
                        message: ' passwored incorrrect ',
                        status: 401,
                });
            }
            const token = jwt.sign(userlogin, config.secretKey , {expiresIn: '15m'});
            res.send({
                message: 'Authorization Token',
                status: 200,
                data: token,
            });
        }
        catch (error) {
            throw error ;
        }
    }
}
const userController = new UserController();
export default userController;

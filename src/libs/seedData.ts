import * as bcrypt from 'bcrypt';
import { userModel } from '../repositories/user/UserModel';
import UserRepository from '../repositories/user/UserRepository';
const userRepository = new UserRepository();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync('Training@123', salt);
export default async () => {
    const user = {
        email: 'kuldeep@successive.tech',
        name: 'Kuldeep Kumar',
        password: hash,
        role: 'head-trainer',
    };
    const count = await userModel.countDocuments();
    if (count === 0) {
            console.log('number of users', count);
            return await userRepository.create(user);
        }
    console.log('number of users', count);
};

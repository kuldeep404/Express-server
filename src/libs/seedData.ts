import * as bcrypt from 'bcrypt';
import { userModel } from '../repositories/user/UserModel';
import UserRepository from '../repositories/user/UserRepository';
import Database from './Database';
const userRepository = new UserRepository();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync('Training@123', salt);
export default ( ) => {
    console.log('Inside seed data :::::: ');
    const user = {
        email: 'kuldeep@gmail.com',
        name: 'kuldeep',
        password: hash,
    };
    console.log('the hash for password ', hash);
    userModel.countDocuments({}, ((err , count) => {
        if (count === 0) {
            console.log('No of user ::::::', count);
            return  userRepository.create(user)
            .then((res) => {
                console.log('User created ::::::: ', res);
                userRepository.update( {name: 'kuldeep'}, {name: 'KULDEEP'} )
                .then(( res ) => {
                    console.log('updated data ::::::', res);
                });
                userRepository.get({name: 'KULDEEP'}, undefined, undefined)
                .then(( res ) => {
                    console.log('featching data ::::::', res);
                });
                userRepository.delete({name: 'kuldeep'})
                .then((res ) => {
                    console.log('deleted file ::::::', res);
                });
            });
        }
      }));
    // .catch((error) => {
    //     console.log('Error occured',error)
    //  });
    // .catch((error) => {
    //     console.log('Error occured ::::::',error)
    // });
    // .catch((error) => {
    //     console.log('Error occured :::::',error)
    // });
};

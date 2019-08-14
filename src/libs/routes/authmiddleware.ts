import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extra/utils/permisions';
import { config } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();
export default ( moduleName, permissionType ) => (req, res, next) => {
    const token = req.headers.authorization;
    const userinfo = jwt.verify(token, config.secretKey );     
    if (hasPermission( moduleName, userinfo.role, permissionType )) {
            userRepository.get({originalId: userinfo._id , deleatedAt: {$exists: false}}, undefined)
    .then((user) => {
        if (!user) {
            next('user does not exist');
        }
        console.log('user from db', user);
        req.user = user;
        next();
    })
    .catch((error) => {
        res.log('errror is ', error);
    });
            
        }
        else {
            next('Unauthrised Access');
        }
    
    // userRepository.get({originalId: userinfo._id , deleatedAt: {$exists: false}}, undefined)
    // .then((user) => {
    //     if (!user) {
    //         next('user does not exist');
    //     }
    //     console.log('user from db', user);
    //     req.user = user;
    //     next();
    // })
    // .catch((error) => {
    //     res.log('errror is ', error);
    // });
};
//     jwt.verify(token, config.secretKey, ( error, result ) => {
//         if (error) {
//             next( 'Unauthrised Access' );
//         }
//         else if (hasPermission( moduleName, result.role, permissionType )) {
//             next();
//         }
//         else {
//             next('Unauthrised Access');

//         }
//     });
//     const role=user.role;
//   console.log("token is",token)

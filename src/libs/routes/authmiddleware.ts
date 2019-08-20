import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extra/utils/permisions';
import { config } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();
export default ( moduleName, permissionType ) => async (req, res, next) => {
    const token = req.headers.authorization;
    const userinfo = jwt.verify(token, config.secretKey );
    try {
        if (hasPermission( moduleName, userinfo.role, permissionType )) {
            const user = await userRepository.get({originalId: userinfo._id , deleatedAt: {$exists: false}}, undefined);
            if (!user) {
                next('user does not exist');
            }
            console.log('user from db', user);
            req.user = user;
            next();
        } else {
            next('Unauthrised Access');
        }
    }
    catch (error) {
        console.error(error);
    }
};

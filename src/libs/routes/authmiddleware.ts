import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extraTs/utils/permisions';
import { config } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
const userRepository = new UserRepository();
export default ( moduleName, permissionType ) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const userinfo = jwt.verify(token, config.secretKey );
        const user = await userRepository.get({originalId: userinfo._id , deleatedAt: {$exists: false}}, undefined);
        if (!user) {
            next('user does not exist');
        }
        req.user = user;
        if (hasPermission( moduleName, userinfo.role, permissionType)) {
        next();
        } else {
            next({
                message: ' Unauthrised access',
                error: 'Unauthrised',
                status: 403,
            });
        }
    }
    catch (error) {
        next({
            message: 'Token expired',
            error: 'Unauthrised',
            status: 403,
        });
    }
};

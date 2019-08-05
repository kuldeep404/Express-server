import {config} from '../../config';
import {hasPermission} from '../../../extraTs/utils';
import * as jwt from 'jsonwebtoken';
export default (moduleName,permissionType) => (req,res,next) => {
    const token = req.headers['authorization'];
    const user = jwt.verify(token ,config.secretKey);
    const role=user.role;
    // console.log("token is",token)
    // console.log("user info",user)

    if(hasPermission(moduleName,role,permissionType)){
        next();
    }
    else {
        // console.log(" not found")
        next("Unauthrised Access");
    }
}
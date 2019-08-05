import {config} from '../../config';
import {hasPermission} from '../../../extraTs/utils';
import * as jwt from 'jsonwebtoken';
export default (moduleName,permissionType) => (req,res,next) => {
    const token = req.headers['authorization'];

    jwt.verify(token ,config.secretKey,(error,result)=>{
            if (error){
                next('Unauthrised Access');
            }
            else if (hasPermission(moduleName,result.role,permissionType)){
                next()
            }
            else{
                next("Unauthrised Access");

            }
            

    });
    //const role=user.role;
    // console.log("token is",token)
    // console.log("user info",user)

    

    
}
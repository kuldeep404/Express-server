import { permissions  } from '../constants' ;
export default function hasPermission({ moduleName, role, permissionType }: {
    moduleName: string; role: string; permissionType: string; }) {
    if (!permissions.hasOwnProperty(moduleName)) {
        return false;
    }
    else if (!permissions[moduleName].hasOwnProperty(permissionType)) {
        return false;
    }
    else if (!permissions[moduleName][permissionType].includes(role)) {
        return false;
    }
    else {
        return true;
    }
}
    // let v =   hasPermission("getUsers","head-trainer","all")
    // console.log(v)

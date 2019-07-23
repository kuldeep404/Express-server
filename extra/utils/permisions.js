let permissions={
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    }}


function hasPermission(moduleName,role, permissionType){
    if (!permissions.hasOwnProperty(moduleName)){
        return false;
    }
    else if(!permissions[moduleName].hasOwnProperty(permissionType)){
        return false;
    }
    else if (!permissions[moduleName][permissionType].includes(role)){
        return false;

    } 
    else{
        return true;
    }
}
     let v =   hasPermission("getUsers","head-trainer","all")
     console.log(v)

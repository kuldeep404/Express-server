import { users } from './constants';
import { diamond, equilateral } from './patterns/index';
import { haspermission, validateUser } from './utils/index';
console.log('printing equilateral triangle pattern: \n');
equilateral(2);
console.log('printing diamond pattern: \n');
diamond(3);

const status = haspermission({ moduleName: 'getUsers', role: 'head-trainer', permissionType: 'all' });
console.log('Permission Granted status:', status);
validateUser(users);

import { equilateral, diamond } from './patterns/index';
import { haspermission, validateUser } from './utils/index';
import { users} from './constants';

console.log("printing equilateral triangle pattern: \n");
equilateral(process.argv[2]);
console.log("printing diamond pattern: \n");
diamond(process.argv[3]);

const status = haspermission('getUsers', 'head-trainer', 'all')
console.log("Permission Granted status:", status);
validateUser(users);







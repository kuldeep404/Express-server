import { equilateral_new, diamond_new } from './patterns/index';
import { haspermission_new, validateUser_new } from './utils/index';
import { users_new} from './constants';
equilateral_new(process.argv[2]);
diamond_new(process.argv[3]);
const status = haspermission_new('getUsers', 'head-trainer', 'all')
console.log("Permission Granted status:", status);
validateUser_new(users_new);







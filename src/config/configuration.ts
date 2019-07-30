import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const envVars = process.env;
const configuration: IConfig = Object.freeze({
port: envVars.PORT,
});
export default configuration;

import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const envVars = process.env;
const configuration: IConfig = Object.freeze({
port: envVars.PORT,
secretKey:envVars.SECRET_KEY,
});
export default configuration;

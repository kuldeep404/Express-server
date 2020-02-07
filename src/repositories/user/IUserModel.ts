import * as mongoose from 'mongoose';
import IVersionableModel from '../versionable/IVersionableModel';
export default interface IUserModel extends IVersionableModel {
    id: string;
    name: string;
    email: string;
    password: string;
}

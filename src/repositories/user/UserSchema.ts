import * as mongoose from 'mongoose';
import VersionableSchema from '../versionable/VersionableSchema';
export default class UserSchema extends VersionableSchema {
    constructor(option: any ) {
        const baseSchema = {
            _id: String,
            email: {
                required: true,
                type: String,
                unique: true,
            },
            name: {
                required: true,
                type: String,
            },
            password: {
                required: false,
                type: String,
            },
            role: {
                required: true,
                type: String,
            },
        };
        super(baseSchema, option);
    }
}

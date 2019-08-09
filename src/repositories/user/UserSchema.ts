import * as mongoose from 'mongoose';
export default class UserSchema extends mongoose.Schema {
    constructor(option: any ) {
        const baseSchema = {
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
                required: true,
                type: String,
            },
        };
        super(baseSchema, option);
    }
}

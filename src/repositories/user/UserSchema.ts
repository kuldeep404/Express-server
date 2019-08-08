import * as mongoose from 'mongoose';
export default class UserSchema extends mongoose.Schema {
    constructor(option: any ) {
        const baseSchema = {
            email : {
                required : true,
                type : String,
            },
            name : {
                required: true,
                type: String,
            },
        };
        super(baseSchema, option);
    }
}

import * as mongoose from 'mongoose';


export default class userSchema extends mongoose.Schema {
    
    constructor(option : any ){
        const baseSchema = {
            name : {
                required: true,
                type: String,
            },
            email : {
                required : true,
                type : String,
            },          
        }
        super(baseSchema,option);
    }
}
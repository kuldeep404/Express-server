import * as mongoose from 'mongoose';
import IUserSchema  from './UserSchema';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

const toConvert = {
    trasform :(doc,ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
    virtuals : true
};
export const userSchema = new UserSchema({
    collection: 'user',
    toJSON : toConvert,
    toObject : toConvert,
});

export const userModel : mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
    'user ',
    userSchema,
    'users',
    true,
);  
import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import IUserSchema from './UserSchema';
import UserSchema from './UserSchema';
const toConvert = {
    trasform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
    },
    virtuals : true,
};
export const userSchema = new UserSchema({
    collection: 'user',
    toJSON: toConvert,
    toObject: toConvert,
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
    'user ',
    userSchema,
    'users',
    true,
);

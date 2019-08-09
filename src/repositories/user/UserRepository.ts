
import { IQueryGet } from './entities';
import { userModel } from './UserModel';
export default class UserRepository {
    private userModel: any;
    public constructor() {
            this.userModel = userModel;
    }
    public get(query, projection, option)  {
        return userModel.find(query, projection, option);
    }

    public findOne(query) {
        return userModel.findOne(query).lean();
    }
    public update(query, dataToUpdate) {
        return userModel.updateOne(query, dataToUpdate);
    }
    public create(data) {
        return userModel.create(data);
    }
    public delete(data) {
        return userModel.deleteOne(data);
    }
}

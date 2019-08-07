
import { userModel } from './UserModel';
import {IQueryGet} from './entities';



export default class UserRepository {
    userModel:any;
    constructor(){
            this.userModel = userModel;
    }
    public get(query, projection, option)  {
        return userModel.find(query,projection,option)    
    }
    public update(query,dataToUpdate) {
        return userModel.updateOne(query,dataToUpdate); 
    }
    public create(data){
        return userModel.create(data);
    }
    public delete(data) {
        
        return userModel.deleteOne(data);
    }

}
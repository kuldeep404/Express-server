import * as mongoose from 'mongoose';
import userRepository from './seedData';
class Database {
    static open (mongoUri){
        mongoose.connect(mongoUri, {useNewUrlParser: true} ,(error) => {
            if(error){
                console.log("connection error",error);
            }
            console.log("successfullly connected with mongoose");
            
        });
        userRepository();    
    }
    static Disconnect(){
        mongoose.disconnect();
        //console.log("connection ,closed")
    }
}

export default Database;

import * as mongoose from 'mongoose';
import userRepository from './seedData';
class Database {
    public static open( mongoUri ) {
        mongoose.connect(mongoUri, {useNewUrlParser: true} , ( error ) => {
            if ( error ) {
                console.log('connection error', error);
            }
            console.log('successfullly connected with mongoose');
            userRepository();
        });
    }
    public static Disconnect() {
        mongoose.disconnect();
    }
}
export default Database;

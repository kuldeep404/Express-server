import * as mongoose from 'mongoose';
import seedData from './seedData';
class Database {
    public static async open( mongoUri ) {
        const res = await mongoose.connect(mongoUri, {useNewUrlParser: true} );
        if ( !res) {
                console.log('connection error', res);
            }
        console.log('successfullly connected with mongoose');
        await seedData();
    }
    public static Disconnect() {
        mongoose.disconnect();
    }
}
export default Database;

import * as mongoose from 'mongoose';
const kittySchema = new mongoose.Schema({       
    name: String
  });

const Kitten = mongoose.model('Kitten', kittySchema);    

class Database {
    static open (mongoUri){
        mongoose.connect(mongoUri, {useNewUrlParser: true} ,(error) => {
            if(error){
                console.log("connection error",error);
            }
            console.log("successfullly connected with mongoose");
            
        });
        playWithMango()
        
        
    }
    static Disconnect(){
        mongoose.disconnect();
        console.log("connection ,closed")
    }
}
function playWithMango() {
    saveKitten({name:'Trainning'})
        .then(res => {
            console.log('the response is ',res)
            return Kitten.find({name:"Trainning"})
        })
        
        .then(res => {
            console.log('kitten are ',res)

    
        })
        .then(()=>{
            Database.Disconnect()
        })
        
        .catch(error => {
            console.log('the response is ',error)
        })
}

function saveKitten (data){
    return new Promise((resolve,reject) => {
        const kitty = new Kitten(data);
        kitty.save((error,res) => {
            if(error){
                return reject(error);
            }
            resolve(res);
        })
    })
}
export default Database;

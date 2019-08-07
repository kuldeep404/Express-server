import UserRepository from '../repositories/user/UserRepository';
import Database from './Database';
const userRepository = new UserRepository();
export default ( ) => {
    console.log('Inside seed data :::::: ');
    const user = {
        name : 'kuldeep',
        email : 'kuldeep@gmail.com',
    };
    userRepository.create(user)
    .then((res) => {
        console.log("User created ::::::: ",res);
    })
    .then(() =>{
       Database.Disconnect();
    })
    .catch((error) => {
        console.log('Error occured',error)
    });
    userRepository.update({name: 'kuldeep'},{name: 'KULDEEP'}).then((res) => {
        console.log('updated data ::::::',res)
    })
    .catch((error) => {
        console.log('Error occured',error)
     });
    userRepository.get({name:'kuldeep'},null,null).then((res )=> {
        console.log("Fetching all data :::::::", res);
    })
    .catch((error) => {
        console.log('Error occured ::::::',error)
    });
    userRepository.delete({name:'KULDEEP'}).then((res )=> {
        console.log("deleted file ::::::", res)
    })
    .catch((error) => {
        console.log('Error occured :::::',error)
    });
}

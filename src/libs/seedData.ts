import UserRepository from '../repositories/user/UserRepository';
import Database from './Database';
const userRepository = new UserRepository();
export default ( ) => {
    console.log('Inside seed data :::::: ');
    const user = {
        email : 'kuldeep@gmail.com',
        name : 'kuldeep',
    };
    userRepository.create(user)
    .then((res) => {
        console.log('User created ::::::: ', res);
    // .then(() =>{
    //    Database.Disconnect();
    // })
    // .catch((error) => {
    //     console.log('Error occured',error)
    // });
        userRepository.update( {name: 'kuldeep'}, {name: 'KULDEEP'} )
        .then(( res ) => {
            console.log('updated data ::::::', res);
        });
        userRepository.get({name: 'kuldeep'}, undefined, undefined)
        .then(( res ) => {
            console.log('featching data ::::::', res);
        });
        userRepository.delete({name: 'kuldeep'})
        .then((res ) => {
            console.log('deleted file ::::::', res);
        });
    })
    .catch((error) => {
        console.log('Error occured', error);
     });
    // .catch((error) => {
    //     console.log('Error occured ::::::',error)
    // });
    // .catch((error) => {
    //     console.log('Error occured :::::',error)
    // });
};

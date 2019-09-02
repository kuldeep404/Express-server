import validateEmail from './helpers';
export default function validateUser(newUser) {
  let validuser = [];
  let invaliduser = [];  
  newUser.forEach(function(users){
    const { traineeEmail, reviewerEmail } = users;  
    if (validateEmail(traineeEmail)) {
      validuser.push(traineeEmail);
      
    } 
    else {
      invaliduser.push(traineeEmail);
      
    }
    if (validateEmail(reviewerEmail)){
      validuser.push(reviewerEmail);
      
    }
    else {
      invaliduser.push(reviewerEmail);   
    }
  }); 
  console.log(`The names of valid users are :  ${ validuser  } and  count of valid user is  ${ validuser.length }`);
  console.log(`The names of invalid users are : ${ invaliduser } and count of invalid user is ${ invaliduser.length }`);
}

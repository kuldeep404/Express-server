import validateEmail from './helpers';
export default function validateUser(newUsers) {
  let validuser = [];
  let invaliduser = [];  
  new_users.forEach(function(users){
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
console.log("\nThe names of valid users are :\n " + validuser + "   \nThe count of valid user is:\n " + validuser.length);
console.log("\nThe names of invalid users are :\n " + invaliduser + "   \nThe count of invalid user is:\n " + invaliduser.length);
}

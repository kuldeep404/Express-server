
let users =[
    {
    traineeEmail: 'trainee@successive.tech',
    reviewerEmail: 'reviewer1@successive.tech',
    },{
        traineeEmail: '*trainee2@successive.tech',
        reviewerEmail: 'reviewer21@successive.tech'
    },
    {
        traineeEmail: 'trainee@successive22.tech',
    reviewerEmail: '%reviewer1@successive.tech'
    }
    ]

function validateEmail(email) 
{
 
 let x=/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@successive.tech$/
 if (x.test(email)){
    
    return true;
 
 }
 else{
    
    return false;
 }
} 
function validateUser(new_users) {

    let validuser = [];
    let invaliduser = [];
    
   
    
      new_users.forEach(function(user) {
        const { traineeEmail: a, reviewerEmail:b } = user;      //using destructuring assign value to a,b
        if (validateEmail(a)) {
            validuser.push(a);
          
        } else {
          invaliduser.push(a);
          
        }
        if (validateEmail(b)) {
          validuser.push(b);
          
        }
        else {
            invaliduser.push(b);
            
          }
        
      });
    
      console.log("\nThe names of valid users are :\n " + validuser + "   \nThe count of valid user is:\n " + validuser.length);
      console.log("\nThe names of invalid users are :\n " + invaliduser + "   \nThe count of invalid user is:\n " + invaliduser.length);
    }
validateUser(users)
    
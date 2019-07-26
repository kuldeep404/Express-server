import validateEmail from './helpers';
export default function validateUser(newUser: any) {

  const validuser: string[] = [];
  const invaliduser: string[] = [];
  newUser.forEach ( (user: any) => {
    const { traineeEmail, reviewerEmail } = user;
    if (validateEmail(traineeEmail)) {
      validuser.push(traineeEmail);
    }
    else {
      invaliduser.push(traineeEmail);
    }
    if (validateEmail(reviewerEmail)) {
      validuser.push(reviewerEmail);
    }
    else {
      invaliduser.push(reviewerEmail);
    }
  });
  console.log('The names of valid users are :\n' + validuser + '\nThe count of valid user is:\n ' + validuser.length);
  console.log('\names of invalid users are :\n ' + invaliduser + ' count of invalid user is:\n ' + invaliduser.length);
}
// validateUser(users)

export default function validateEmail(email) 
{
 
 let x=/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@successive.tech$/
 return x.test(email)
 
}
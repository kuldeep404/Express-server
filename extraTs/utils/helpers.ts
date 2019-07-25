export default function validateEmail( email: any ) {
 const x: RegExp = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@successive.tech$/;
 return x.test(email);
}

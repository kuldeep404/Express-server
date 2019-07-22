function equitri(n){
    var str = '';
    for(var i=1; i<=n; i++){
        for(var k=1; k<=n-i; k++){
            str += " ";
        }
        for(var j=1; j<=i; j++){
            str += "* ";
        }
        console.log(str);
        str = "";
    }
    for(var i=n; i>0; i--){
        for(var k=1; k<=n-i; k++){
            str += " ";
        }
        for(var j=1; j<=i; j++){
            str += "* ";
        }
        console.log(str);
        str = "";
    }
    
}
var n=process.argv[2];
if (n >= 2 && n <= 10){
    equitri(n);

} 
else{
    console.log('invalid input');
}



    

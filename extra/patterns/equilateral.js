export default function equilateral(n){
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

}
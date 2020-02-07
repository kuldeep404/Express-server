export default function diamond( n: number ) {
    let  str: string = ' ';
    for (let i: number = 1; i <= n; i++ ) {
        for (let k: number = 1; k <= n - i; k++ ) {
            str += ' ' ;
        }
        for (let j: number = 1; j <= i; j++ ) {
            str += '* ';
        }
        console.log(str);
        str = ' ';
    }
    for ( let i = n; i > 0; i-- ) {
        for ( let k = 1; k <= n - i; k++ ) {
            str += ' ';
        }
        for ( let j = 1; j <= i; j++ ) {
            str += '* ';
        }
        console.log(str);
        str = ' ';
    }
}

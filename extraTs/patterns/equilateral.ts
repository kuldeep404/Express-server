export default function equilateral(n: number) {
    let str: string = ' ';
    for ( let i: number = 1; i <= n; i++ ) {
        for ( let k: number = 1; k <= n - i; k++ ) {
            str += ' ';
        }
        for ( let j: number = 1; j <= i; j++ ) {
            str += '* ';
        }
        console.log( str );
        str = ' ';
    }
}

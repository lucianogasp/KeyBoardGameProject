var array = [1, 2, 3, 4];
let c = 0

class Oi {
    constructor () {
        this.c = 0
    }

    increment () {
        this.c++;
    }
}

const oi = new Oi();
console.log(oi.c);
oi.increment();
oi.increment();
oi.increment();
console.log(oi.c);

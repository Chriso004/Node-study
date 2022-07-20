const add = {
    a: 1,
    b: 2,
    sum: function() {
        return this.a + this.b
    }
}

console.log(add.a);
console.log(add.b);
console.log(add.sum());
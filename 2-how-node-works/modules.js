// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports
//const calc2 = require("./test-module2");
const { add, multiply } = require("./test-module2");

console.log(add(2, 5));
console.log(multiply(2, 5));

//caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();

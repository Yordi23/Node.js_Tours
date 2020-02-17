const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log('Timer 1 finished'),0);//2
setImmediate(() => console.log('Immediate 1 finished'));//3

fs.readFile('test-file.txt', () =>{
    console.log('I/O finished');//4

    setTimeout(() => console.log('Timer 2 finished'),0);//6
    setTimeout(() => console.log('Timer 3 finished'),3000);//7
    setImmediate(() => console.log('Immediate 2 finished'));//5

    process.nextTick(() => console.log('Process.nextTick'));

    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })

    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => {
        console.log(Date.now() - start,'Password encrypted')
    })
})

console.log('Hello from the top-level code');//1
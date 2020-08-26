const fs = require("fs");
const { promisify } = require("util");

//同步读取
// const data = fs.readFileSync('./conf.js')
// console.log(data);
// console.log(data.toString());

//异步读取
// fs.readFile("./conf.js", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   console.log(data.toString());
// });

//promise方法
(async () => { //为了使用async/await，用了IIAF函数
    const fs = require("fs");
    const { promisify } = require("util");
    const readFile = promisify(fs.readFile)
    const data = await readFile('./conf.js')
    console.log('IIAF: ', data);
})()

//process.nextTick()方法
process.nextTick(async () => {
    const fs = require('fs')
    const {promisify} = require('util')
    const readFile = promisify(fs.readFile)
    const data = await readFile('./conf.js')
    console.log('process.nextTick: ', data);
})


const buf1 = Buffer.alloc(10)
console.log('buf1:', buf1);

const buf2 = Buffer.from('a')
console.log('buf2:', buf2);

const buf3 = Buffer.from('中文')
console.log('buf3:', buf3, buf3.toString());

const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4: ', buf4, buf4.toString());

const buf5 = buf2 + buf3
console.log('buf5:', buf5);
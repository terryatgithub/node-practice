const fs = require('fs');
const { rejects } = require('assert');
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0;
    return new Promise((resolve, reject) => {
        //@暗号 二分查找
        readStream.on('data', chunk => {
            console.log('>>> data: ', chunk);
            reqData.push(chunk)
            size += chunk.length
        })
        readStream.on('end', () => {
            const data = Buffer.concat(reqData, size)
            console.log('end: ', size, ' ', data.toString());
            resolve(JSON.parse(data))
        })
        readStream.on('error', err => {
            console.log('err: ', JSON.stringify(err));
            reject(err)
        })
    })
}

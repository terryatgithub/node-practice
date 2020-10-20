const YKOA = require('./ykoa')
const app = new YKOA()

// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('Hi, Ykoa')
// })
//简化成
app.use(ctx => {
    ctx.body = 'haha ykoa body..'
})

app.listen(3000, () => {
    console.log('ykoa listen on 3000...');
})
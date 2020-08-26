const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Ykoa {
    listen(...args) {
        //创建http服务
        const server = http.createServer((req, res) => {
            //创建上下文
            let ctx = this.createContext(req, res)


            this.callback(ctx)

            //数据响应
            res.end(ctx.body)
        })
    }

    use(callback) {
        this.callback = callback
    }

    /**
     * 创建上下文
     * @param {*} req 
     * @param {*} res 
     */
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    
}

module.exports = Ykoa
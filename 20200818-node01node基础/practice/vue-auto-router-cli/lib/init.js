const {promisify}  = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const {clone} = require('./download')

const log = content => console.log(chalk.green(content))

const spawn = async (...args) => {
    const {spawn} = require('child_process')
    //封装成promise风格语法
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout) //子进程产生的输出流与主进程输出流对接
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => { //完成后会出发close事件
            resolve()
        })
    })
}

module.exports = async name => {
    // log welcome ui
    clear()
    const data = await figlet('yb Welcome')
    log(data)
    log(`🚀create project: ${name}`)
    //init
    //github address is the url path, not normal github download url.
    // await clone('github:terryatgithub/vue-template', name)

    // 安装依赖
    log(' install dependencies.')
    // await spawn('npm', ['install'], {cwd: `./${name}`})

    // 安装完成
    log(`
    👌安装完成：
    To get start:
    ===================
        cd ${name}
        npm run serve
    ===================
    `)

    // 启动项目
    const open = require('open')
    // open browser
    // @todo 这里没有自动刷新
    open(`http://localhost:8080`)
    await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})

        
}
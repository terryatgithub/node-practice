const fs = require('fs')
const hanldebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
    //获取页面列表
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))
    //编译函数
    //路由
    compile({list}, './src/router.js','./template/router.js.hbs')
    //菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    /**
     * 编译模板
     * @param {*} meta 输入数据定义
     * @param {*} filePath 目标文件
     * @param {*} tempaltePath 模板文件
     */
    function compile(meta, filePath, tempaltePath) {
        if (fs.existsSync(tempaltePath)) {
            const content = fs.readFileSync(tempaltePath).toString()
            const result = hanldebars.compile(content)(meta)
            fs.writeFileSync(filePath, result)
            console.log(`🚀 ${filePath}创建成功`);

        }
    }
}
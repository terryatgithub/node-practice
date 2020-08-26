const { resolve } = require("path");
const fs = require("fs");

module.exports.getRouter = (path = resolve("./")) => {
  const files = fs.readdirSync(path).map((v) => ({
    name: v.replace(".vue", "").toLowerCase(),
    file: v,
  }));
  //@暗号 递归
  const route = `
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
${files.map(
  (f) => `{
    path: '/${f.name}',
    name: '${f.name}',
    component: () => import('./views/${f.file}')
},
`).join('')}
    ]
})`;
  console.log(route);
  return route;
};

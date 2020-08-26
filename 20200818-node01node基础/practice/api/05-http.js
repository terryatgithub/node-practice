const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  console.log("this is a request", getPrototypeChain(request));
  console.log("this is a response", getPrototypeChain(response));
  // response.end('hello, this is response')

  const { url, method, headers} = request;
  if (url === "/" && method === "GET") {
    //静态页面服务
    fs.readFile("index.html", (err, data) => {
      if (err) {
        //一次性定义
        response.writeHead(500, {
          "Content-Type": "text/plain;charset=utf-8",
        });
        response.end("500 服务器错误 yb");
        return;
      }
      //多次定义
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(data); //可以接受二进制类型data
    });
  } else if (url === "/user" && method === "GET") {
      //JSON数据
    response.writeHead(200, {
      "Content-type": "application/json",
    });
    response.end(JSON.stringify([{ name: "tom" }]));
  } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
      //用headers判断是否是图像请求
      //二进制字节流（图片。。。）
    fs.createReadStream('./' + url) // ./1.png 需要加当前目录'.'
        .pipe(response) //response也是个流，所以可以直接用pipe连接
  }
  
  else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.end("404 页面没只找到... yb");
  }
});

server.listen(3000, () => {
  console.log("Server is listening at 3000");
});

function getPrototypeChain(obj) {
  //获取对象的原型链
  const protoChain = [];
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj);
  }
  return protoChain;
}

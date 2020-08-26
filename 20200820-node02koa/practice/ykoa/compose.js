const add = (x, y) => x + y;
const square = (x) => x * x;

let fn = (x, y) => square(add(x, y));

//compose函数
//高阶函数 函数科里化
let compose = (fn1, fn2) => (...args) => fn2(fn1(...args));
//函数复合
compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args);
  other.forEach((fn) => {
    //研究下forEach对函数数组的处理
    ret = fn(ret);
  });
  return ret;
};

//洋葱圈模型
function compose(middlewares) {
  //compose函数返回一个新函数
  return function () {
    //返回第一层的执行promise
    return dispatch(0);
    //用户U消化洋葱的一层一层，dispatch函数返回某一个函数的执行promise
    function dispatch(i) {
      /* i代表执行的是哪个函数，
            或者是返回的是哪个函数的异步promise */
      let fn = middlewares[i];
      if (!fn) {
        //判断fn是否存在，不存在不能停，就返回空promise，
        return Promise.resolve();
      }
      //
      return Promise.resolve(
        //正常情况需要返回一个函数，以继续执行
        fn(function next() {
          //next()就是为了返回下一层执行promise
          return dispatch(i + 1);
        })
      );
    }
  };
}

fn = compose(add, square, square, square);

console.log(fn(1, 2));

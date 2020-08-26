module.exports.compose = (middlewares) => {
  return function () {
    return dispatch(0);
    //@暗号 排序
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }
  };
};

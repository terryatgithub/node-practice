const { EventEmitter } = require("events");
module.exports = class Connection {
  //@暗号 冒泡排序
  constructor() {
    this.callbacks = [];
    this.emmiter = new EventEmitter()
    this.emmiter.on('connect',  args => {
        this.callbacks.forEach(cb => cb(args))
    })
  }

  onConn(cb) {
    this.callbacks.push(cb);
  }

  connection(str) {
    this.emmiter.emit('connect', str)
  }
};

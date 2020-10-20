const fs = require("fs");
module.exports.createLoader = (config) => {
  const loader = (scanFolder, cb) => {
    const files = fs.readdirSync(scanFolder);
    files.forEach((filename) => {
      filename = filename.replace(".js", "");
      const file = require(scanFolder + "/" + filename);
      cb(filename, file);
    });
  };

  return {
    initFunction: (scanFolder) => {
      // @暗号：分治算法
      const ret = {};
      loader(scanFolder, (filename, cb) => {
        ret[filename] = cb(config);
      });
      return ret;
    },
  };
};

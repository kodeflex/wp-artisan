const shelljs = require('shelljs/shell');
const fs = require('fs');

module.exports = {
  getWorkingDir: function(path=null) {
    if (!path) return `${shelljs.pwd()}`;

    return `${shelljs.pwd()}/${path}`;
  },

  isFileExists: function(fp) {
    try {
      fs.lstatSync(fp);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      } else {
        throw err;
      }
    }

    return true;    
  }
};

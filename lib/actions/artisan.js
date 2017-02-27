const Utils = require('./utils');
const env = require('../env');

module.exports = {
  isInitialized: function(path) {
    const workingDir = Utils.getWorkingDir(path);
    const isConfigExists = Utils.isFileExists(`${workingDir}/${env.templates.config}`);

    if(isConfigExists) {
      return true;
    }
    return false;
  }
}


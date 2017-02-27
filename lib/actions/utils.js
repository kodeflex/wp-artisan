const shelljs = require('shelljs/shell');
const fs = require('fs');
const fsExtra = require('fs-extra');
const _ =  require('lodash');

function getFileContent(tplFp, tplParams) {
  const tplContent = Utils.readFileSync(tplFp);

  if (!tplParams) {
    return tplContent;
  }
  return _.template(tplContent)(tplParams);
}

const Utils = {
  getWorkingDir: function(path=null) {
    if (!path) return `${shelljs.pwd()}`;

    return `${shelljs.pwd()}/${path}`;
  },

  getTemplatePath: function(fp) {
    return `${__dirname}/../templates/${fp}.tpl`;
  },

  getResourcePath: function(fp) {
    return `${__dirname}/../resources/${fp}`;
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
  },

  writeFileSync: function(targetFp, tplFp, tplParams) {
    const fileContent = getFileContent(tplFp, tplParams);
    fsExtra.outputFileSync(targetFp, fileContent);
  },

  readFileSync: function(fp, charset=null) {
    const content = fs.readFileSync(fp, charset);
    return content;
  },

  copyFileSync: function(srcFp, targetFp) {
    shelljs.cp('-R', srcFp, targetFp);
  },
  
  mkdirSync: function(path) {
    try {
      fs.statSync(path);
    } catch(err) {
      fs.mkdirSync(path);
    }
  },

  forceUnlink: function(fp) {
    if (typeof fp !== 'object') {
      return;
    }
    shelljs.rm('-rf', fp);
  }
};

module.exports = Utils;

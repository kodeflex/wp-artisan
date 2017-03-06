const shelljs = require('shelljs/shell');
const fs = require('fs');
const fsExtra = require('fs-extra');
const _ = require('lodash');

const Utils = {
  getWorkingDir(path = null) {
    if (!path) return `${shelljs.pwd()}`;

    return `${shelljs.pwd()}/${path}`;
  },

  getTemplatePath(fp) {
    return `${__dirname}/../templates/${fp}.tpl`;
  },

  getResourcePath(fp) {
    return `${__dirname}/../resources/${fp}`;
  },

  getLogPath(fp) {
    return `${__dirname}/../templates/logs/${fp}.tpl`;
  },

  getDirContents(path) {
    return fs.readdirSync(path);
  },

  isFileExists(fp) {
    try {
      fs.lstatSync(fp);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      }
      throw err;
    }

    return true;
  },

  writeFileSync(targetFp, tplFp, tplParams) {
    const fileContent = getFileContent(tplFp, tplParams);
    fsExtra.outputFileSync(targetFp, fileContent);
  },

  writeJSONSync(fp, fileContent) {
    fsExtra.outputFileSync(fp, JSON.stringify(fileContent, null, 2));
  },

  readFileSync(fp, charset = null) {
    const content = fs.readFileSync(fp, charset);
    return content;
  },

  copyFileSync(srcFp, targetFp) {
    shelljs.cp('-R', srcFp, targetFp);
  },

  mkdirSync(path) {
    try {
      fs.statSync(path);
    } catch (err) {
      fs.mkdirSync(path);
    }
  },

  forceUnlink(fp) {
    if (typeof fp !== 'object') {
      return;
    }
    shelljs.rm('-rf', fp);
  }
};

function getFileContent(tplFp, tplParams) {
  const tplContent = Utils.readFileSync(tplFp);

  if (!tplParams) {
    return tplContent;
  }
  return _.template(tplContent)(tplParams);
}

module.exports = Utils;

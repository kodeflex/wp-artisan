const wpCli = require('node-wp-cli');

const Utils = require('./utils');
const Logs = require('./logs');

const env = require('../env');
const pkg = require('../../package.json');

module.exports = {
  isInitialized: function(path) {
    const workingDir = Utils.getWorkingDir(path);
    const isConfigExists = Utils.isFileExists(`${workingDir}/${env.templates.config}`);

    if(isConfigExists) {
      return true;
    }
    return false;
  },

  initialize: function(path, config, options=null) {
    // show initializing message
    Logs.show('project-initializing', {
      type: 'Info',
      message: null,
      params: {}
    });

    // get woring directory
    const workingDir = Utils.getWorkingDir(path);

    // set `wpCli` args
    const args = {};
    if (options && options.force) args.force = true;

    args.path = env.init.dir;
    if (path) {
      // create the working directory
      Utils.mkdirSync(path);
      args.path = `${path}/${env.init.dir}`;
    }

    // download wordpress-latest
    wpCli.call('core download', args, function(err, resp) {
      if (err) {
        Logs.show('fetching-wordpress-latest-failed', {
          type: 'Error',
          message: err.message,
          params: {}
        });     
        return;
      }

      Logs.show('fetching-wordpress-latest-success', {
        type: 'Info',
        message: resp.message,
        params: {}
      });

      // update `cliVersion` to config
      config['cliVersion'] = pkg.version;

      // create `site.json`
      Utils.writeFileSync(
        `${workingDir}/${env.templates.config}`,
        Utils.getTemplatePath(env.templates.config),
        config
      );

      // clean wordpress codebase
      const deleteList = env.deleteList;
      for (let i=0; i < deleteList.length; i++) {
        deleteList[i] = deleteList[i].replace('<siteDir>', `${workingDir}/${env.init.dir}`);
      }
      Utils.forceUnlink(deleteList);

      // create `wp-config.php`
      Utils.writeFileSync(
        `${workingDir}/${env.init.dir}/${env.templates.wpConfig}`,
        Utils.getTemplatePath(env.templates.wpConfig),
        config
      );

      // create `.gitignore`
      Utils.writeFileSync(
        `${workingDir}/${env.templates.gitignore}`,
        Utils.getTemplatePath(env.templates.gitignore)
      );

      Logs.show('project-initialized', {
        type: 'Info',
        message: null,
        params: {}
      });
    });
  }
}


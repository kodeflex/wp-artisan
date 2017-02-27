const _ =  require('lodash');

const Utils = require('./utils');
const Logs = require('./logs');
const artisan = require('./artisan');

const env = require('../env');

module.exports = {
  update: function(key, val) {
    // check if already initialized a project
    if (! artisan.isInitialized()) {
      Logs.show('project-invalid-working-directory', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    } 

    // check isAllow to update the key
    var allowUpdate = env.config.allowUpdate;
    var isAllowed = (_.indexOf(allowUpdate, key) > -1) ? true : false;
    if (!isAllowed) {
      Logs.show('config-update-disallowed', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // logs
    Logs.show('config-updating', {
      type: 'Info',
      message: null,
      params: {}
    });

    var config = JSON.parse(Utils.readFileSync('./site.json', 'utf-8'));
    config.db[key] = val;

    // [TODO]
    // Improve the logic here
    var newConfig = config.db;
    newConfig['siteName'] = config.siteName;
    newConfig['cliVersion'] = config.cliVersion;

    // update `site.json`
    Utils.writeFileSync(
      './site.json',
      Utils.getTemplatePath(env.templates.config),
      newConfig
    );

    // update `wp-config.php`
    Utils.writeFileSync(
      './site/wp-config.php',
      Utils.getTemplatePath(env.templates.wpConfig),
      newConfig
    );

    // [TODO]
    // Update the database fields in site already installed

    // logs
    Logs.show('config-updated', {
      type: 'Info',
      message: null,
      params: {}
    });
  }
};

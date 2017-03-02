const _ = require('lodash');

const Utils = require('./utils');
const Logs = require('./logs');
const artisan = require('./artisan');

const env = require('../env');

module.exports = {
  update(key, val) {
    // check if already initialized a project
    if (!artisan.isInitialized()) {
      Logs.show('working-directory-invalid', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // check isAllow to update the key
    const allowUpdate = env.config.allowUpdate;
    const isAllowed = (_.indexOf(allowUpdate, key) > -1);
    if (!isAllowed) {
      Logs.show('config-update-invalid', {
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

    const config = JSON.parse(Utils.readFileSync(`./${env.templates.config}`, 'utf-8'));
    config.db[key] = val;

    // update `site.json`
    Utils.writeJSONSync(`${env.templates.config}`, config);

    // [TODO]
    // Improve the logic here

    const newConfig = config.db;
    newConfig.siteName = config.siteName;
    newConfig.cliVersion = config.cliVersion;

    // update `wp-config.php`
    Utils.writeFileSync(
      `./${env.init.dir}/${env.templates.wpConfig}`,
      Utils.getTemplatePath(env.templates.wpConfig),
      newConfig
    );

    // [TODO]
    // Update the database fields in site already installed

    // logs
    Logs.show('config-update-success', {
      type: 'Info',
      message: null,
      params: {}
    });
  }
};

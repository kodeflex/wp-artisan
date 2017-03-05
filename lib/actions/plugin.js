const wpCli = require('node-wp-cli');

const Logs = require('./logs');
const artisan = require('./artisan');

const env = require('../env');

// [TODO]
// Here, we can provide number of options to update/remove plugins
// Need to implement them later

// [TODO]
// If already installed the wordpress; can activate the plugin too.

module.exports = {
  add(pluginName) {
    // check if already initialized a project
    if (!artisan.isInitialized()) {
      Logs.show('working-directory-invalid', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // logs
    Logs.show('plugin-installing', {
      type: 'Info',
      message: null,
      params: {}
    });

    // set `wpCli` args
    const args = {
      path: env.defaults.installDir
    };

    // install the plugin
    wpCli.call(`plugin install ${pluginName}`, args, (err, resp) => {
      if (err) {
        Logs.show('plugin-installing-failed', {
          type: 'Error',
          message: null,
          params: {
            message: resp.message
          }
        });
        return;
      }

      Logs.show('plugin-installing-success', {
        type: 'Info',
        message: null,
        params: {}
      });
    });
  },

  remove(pluginName) {
    // check if already initialized a project
    if (!artisan.isInitialized()) {
      Logs.show('working-directory-invalid', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // logs
    Logs.show('plugin-uninstalling', {
      type: 'Info',
      message: null,
      params: {}
    });

    // set `wpCli` args
    const args = {
      path: env.defaults.installDir
    };

    // install the plugin
    wpCli.call(`plugin uninstall ${pluginName}`, args, (err, resp) => {
      if (err) {
        Logs.show('plugin-uninstalling-failed', {
          type: 'Error',
          message: null,
          params: {
            message: resp.message
          }
        });
        return;
      }

      Logs.show('plugin-uninstalling-success', {
        type: 'Info',
        message: null,
        params: {}
      });
    });
  }
};

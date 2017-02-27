const wpCli = require('node-wp-cli');

// [TODO]
// Here, we can provide number of options to update/remove plugins
// Need to implement them later

// [TODO]
// If already installed the wordpress; can activate the plugin too.

module.exports = {
  add: function(pluginName) {
    // check if already initialized a project
    if (! artisan.isInitialized()) {
      Logs.show('project-invalid-working-directory', {
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
    const args = {};

    // install the plugin
    wpCli.call(`plugin install ${pluginName}`, args, function(err, resp) {
      if (err) {
        Logs.show('plugin-installing-failed', {
          type: 'Error',
          message: err.message,
          params: {}
        });
        return;
      }

      Logs.show('plugin-installing-success', {
        type: 'Info',
        message: resp.message,
        params: {}
      });      
    });
  },

  remove: function(pluginName) {
    // check if already initialized a project
    if (! artisan.isInitialized()) {
      Logs.show('project-invalid-working-directory', {
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
    const args = {};

    // install the plugin
    wpCli.call(`plugin uninstall ${pluginName}`, args, function(err, resp) {
      if (err) {
        Logs.show('plugin-uninstalling-failed', {
          type: 'Error',
          message: err.message,
          params: {}
        });
        return;
      }

      Logs.show('plugin-uninstalling-success', {
        type: 'Info',
        message: resp.message,
        params: {}
      });      
    });
  },
};

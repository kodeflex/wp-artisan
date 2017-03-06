const program = require('commander');

const actions = require('./actions');
const pkg = require('../package.json');

program
  .version(pkg.version);

// program: init
program
  .command('init [path]')
  .option('-f, --force', 'Overwrites existing files, if have.')
  .description('wp init [path] -f')
  .action((path, options) => {
    actions.artisan.initialize(path, options);
  }
);

// program: config
program
  .command('config <key> <val>')
  .option('-u, --update', 'Update site configurations')
  .description('wp config -u <key> <val>')
  .action((key, val, options) => {
    // update
    if (options.update) {
      actions.config.update(key, val);
    }
  }
);

// program: plugin
program
  .command('plugin <action> <pluginName>')
  .description('wp plugin <action> <pluginName>')
  .action((action, pluginName) => {
    switch (action) {
      case 'add':
        actions.plugin.add(pluginName);
        break;
      case 'remove':
        actions.plugin.remove(pluginName);
        break;
      default:
        actions.logs.show('plugin-invalid-option', {
          type: 'Error',
          message: null,
          params: {
            opt: action
          }
        });
        break;
    }
  }
);

// program: theme
program
  .command('theme <action>')
  .option('-c, --clean', 'Clean the theme dierctory')
  .description('wp theme <action>')
  .action((action, options) => {
    switch (action) {
      case 'init':
        actions.theme.init(options);
        break;
      default:
        actions.logs.show('theme-invalid-option', {
          type: 'Error',
          message: null,
          params: {
            opt: action
          }
        });
        break;
    }
  }
);

// program: serve
program
  .command('serve')
  .alias('s')
  .option('-p, --port [value]', 'Port to listen on (instead of the default 8080).')
  .description('wp serve')
  .action((options) => {
    actions.artisan.startServer(options);
  }
);

// program: [anything else]
program
  .command('*')
  .action((env) => {
    // show error message
    actions.logs.show('invalid-command', {
      type: 'Error',
      message: null,
      params: {
        env
      }
    });
  }
);

program.parse(process.argv);

const program = require('commander');
const inquirer = require('inquirer');
const _ = require('lodash');

const actions = require('./actions');
const pkg = require('../package.json');
const env = require('./env');
const promptSchema = require('./promptSchema');

function updateSchema(schema, config) {
  schema.forEach((obj) => {
    if (config[obj.name]) {
      obj.default = config[obj.name];
    }
  });

  return schema;
}

program
  .version(pkg.version);

// program: init
program
  .command('init [path]')
  .option('-f, --force', 'Overwrites existing files, if have.')
  .description('wp init [path] -f')
  .action((path, options) => {
    // show welcome
    actions.logs.show('welcome', {
      type: 'Info',
      message: null,
      params: {}
    });

    // check if already initialized a project
    if (actions.artisan.isInitialized(path)) {
      actions.logs.show('project-already-initialized', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // prompt for user inputs
    actions.logs.show('prompt-for-site-config', {
      type: 'Info',
      message: null,
      params: {}
    });

    inquirer
      .prompt(promptSchema.config)
      .then((config) => {
        // update configs.
        config.cliVersion = pkg.version;
        config.siteUrl = `http://${env.server.host}:${env.server.defaultPort}`;

        // Prompt for install configs.
        if (config.doInstall) {
          inquirer
            .prompt(updateSchema(promptSchema.installConfig, config))
            .then((installConfig) => {
              _.merge(config, installConfig);
              actions.artisan.initialize(path, config, options);
            }
          );
        } else {
          actions.artisan.initialize(path, config, options);
        }
      }
    );
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
  .command('plugin <opt> <pluginName>')
  .description('wp plugin <opt> <pluginName>')
  .action((opt, pluginName) => {
    switch (opt) {
      case 'add':
        actions.plugin.add(pluginName);
        break;
      case 'remove':
        actions.plugin.remove(pluginName);
        break;
      default:
        actions.logs.show('plugin-invalid-option-flag', {
          type: 'Error',
          message: `\r\n  error: invalid option flag \`${opt}\` \r\n`,
          params: {}
        });
        break;
    }
  }
);

// program: template
program
  .command('template <opt>')
  .description('wp template <opt>')
  .action((opt) => {
    switch (opt) {
      case 'init':
        actions.template.init();
        break;
      default:
        actions.logs.show('theme-invalid-option-flag', {
          type: 'Error',
          message: `\r\n  error: invalid option flag \`${opt}\` \r\n`,
          params: {}
        });
        break;
    }
  }
);

// program: serve
program
  .command('serve')
  .alias('s')
  .option('-p, --port [value]', 'Port to listen on (instead of the default 8081).')
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
    actions.logs.show('program-invalid-command', {
      type: 'Error',
      message: `\r\n  error: invalid command input \`${env}\` \r\n`,
      params: {}
    });
  }
);

program.parse(process.argv);

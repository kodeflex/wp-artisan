const program = require('commander');
const inquirer = require('inquirer');

const actions = require('./actions');
const pkg = require('../package.json');
const promptSchema = require('./promptSchema');

program
  .version(pkg.version);

// program: init
program
  .command('init [path]')
  .option('-f, --force', 'Overwrites existing files, if have.')
  .description('wp init [path]')
  .action(function(path, options) {
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
      .then(function (config) {
        actions.artisan.initialize(path, config, options);
      }
    );
  });

// program: [anything else]
program
  .command('*')
  .action(function(env) {
    // show error message
    actions.logs.show('program-invalid-command', {
      type: 'Error',
      message: `\r\n  error: invalid command input \`${env}\` \r\n`,
      params: {}
    });
  });

program.parse(process.argv);

const program = require('commander');

const actions = require('./actions');
const pkg = require('../package.json');
const logger = console;

program
  .version(pkg.version);

// program: [anything else]
program
  .command('*')
  .action(function(env) {
    // show error message
    actions.logs.show('program-invalid-command', {
      type: "Error",
      message: `\r\n  error: invalid command input \`${env}\` \r\n`
    });
  });

program.parse(process.argv);

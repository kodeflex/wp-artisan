const _ = require('lodash');
const chalk = require('chalk');

const Utils = require('./utils');

const logger = console;

module.exports = {
  show(id, log = null) {
    // [TODO]
    // Improve the logging API here
    // - Fetch and show relevent message by id
    // - Colored logs

    const logType = log.type.toLowerCase();

    const method = (log && log.type) ?
      logType :
      'log';

    let message;

    if (log && log.message) {
      message = log.message;
    } else {
      try {
        message = _.template(
          Utils.readFileSync(Utils.getLogPath(`${method}-${id}`))
        )(log.params);
      } catch (err) {
        message = id;
      }
    }

    // Add basic colors to errors and warnings
    if (log && log.type) {
      if (logType === 'error') {
        message = `${chalk.bold.underline.red('Error:')} ${chalk.red(message)}`;
      } else if (logType === 'warn') {
        message = `${chalk.bold.underline.yellow('Warning:')} ${chalk.yellow(message)}`;
      }
    }

    logger[method](message);
  }
};

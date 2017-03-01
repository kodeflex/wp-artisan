const _ = require('lodash');

const Utils = require('./utils');
const logger = console;

module.exports = {
  show(id, log = null) {
    // [TODO]
    // Improve the logging API here
    // - Fetch and show relevent message by id
    // - Colored logs

    const method = (log && log.type) ?
      log.type.toLowerCase() :
      'log';

    let message;
    if (log && log.message) {
      message = log.message;
    } else {
      try {
        message = _.template(
          Utils.readFileSync(Utils.getLogPath(id))
        )(log.params);
      } catch (err) {
        message = id;
      }
    }

    logger[method](message);
  }
};

/* eslint complexity: 0 */

const _ = require("lodash");
const chalk = require("chalk");

const Utils = require("./utils");

const logger = console;

module.exports = {
  show(id, log = null) {
    const method = log && log.type ? log.type.toLowerCase() : "log";

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
      if (log.type === "Error") {
        message = `${chalk.bold.underline.red("Error:")} ${chalk.red(message)}`;
      } else if (log.type === "Warn") {
        message = `${chalk.bold.underline.yellow("Warning:")} ${chalk.yellow(
          message
        )}`;
      }
    }

    logger[method](message);
  }
};

const logger = console;

module.exports = {
  show: function(id, log=null) {
    // [TODO]
    // Improve the logging API here
    // - Fetch and show relevent message by id
    // - Colored logs
    const method = (log && log.type) ?
      log.type.toLowerCase() :
      'log';
    const message = (log && log.message) ? log.message : id;

    logger[method](message);
  }
};

const mysql = require('mysql');

const Logs = require('./logs');

module.exports = {
  create(config, cb) {
    const dbConn = mysql.createConnection({
      host: config.mysqlDbHost,
      user: config.mysqlDbUser,
      password: config.mysqlDbPwd,
      port: config.mysqlDbPort
    });
    dbConn.connect();

    dbConn.query(`CREATE DATABASE ${config.mysqlDbName}`, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, res);
      }
    });
    dbConn.end();
  },

  drop(config, cb) {
    const dbConn = mysql.createConnection({
      host: config.mysqlDbHost,
      user: config.mysqlDbUser,
      password: config.mysqlDbPwd,
      port: config.mysqlDbPort
    });
    dbConn.connect();

    dbConn.query(`DROP DATABASE ${config.mysqlDbName}`, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, res);
      }
    });
    dbConn.end();
  },

  queryExec(config, query, callBack) {
    // Setup the database connection
    const dbConn = mysql.createConnection({
      host: config.mysqlDbHost,
      user: config.mysqlDbUser,
      password: config.mysqlDbPwd,
      port: config.mysqlDbPort,
      database: config.mysqlDbName
    });
    dbConn.connect();

    // Run the query and if success, run the callback
    dbConn.query(query, (err) => {
      let errorMessage = null;

      if (err && err.code === 'ER_DBACCESS_DENIED_ERROR') {
        errorMessage = 'Failed to update the port in the database. Please check your database ' +
      'connection settings in "./site.json"';
      } else if (err) {
        errorMessage = 'Database update failed.';
      } else if (callBack) {
        // If a callback is passed, run it
        callBack();
      }

      if (errorMessage) {
        // Log error
        Logs.show('server-started', {
          type: 'Error',
          message: errorMessage,
          params: {}
        });
      }
    });
    dbConn.end();
  }
};

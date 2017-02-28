const mysql = require('mysql');

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
        cb(null, true);
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
        cb(null, true);
      }
    });
    dbConn.end();
  }
};

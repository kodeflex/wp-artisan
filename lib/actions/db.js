const mysql = require('mysql');

module.exports = {
  create: function(config, cb) {
    var dbConn = mysql.createConnection({
      host : config.mysqlDbHost,
      user : config.mysqlDbUser,
      password : config.mysqlDbPwd,
      port: config.mysqlDbPort
    });
    dbConn.connect();

    dbConn.query('CREATE DATABASE ' + config.mysqlDbName, function(err, res) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, true);
      }
    });
    dbConn.end();
  },

  drop: function(config, cb) {
    var dbConn = mysql.createConnection({
      host : config.mysqlDbHost,
      user : config.mysqlDbUser,
      password : config.mysqlDbPwd,
      port: config.mysqlDbPort
    });
    dbConn.connect();

    dbConn.query('DROP DATABASE ' + config.mysqlDbName, function(err, res) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, true);
      }
    });
    dbConn.end();
  }
};

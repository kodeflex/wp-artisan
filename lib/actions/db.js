const mysql = require('mysql');

module.exports = {
  create(config, cb) {
    const dbConn = mysql.createConnection({
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      port: config.MYSQL_PORT
    });
    dbConn.connect();

    dbConn.query(`CREATE DATABASE ${config.NAME}`, (err, res) => {
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
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      port: config.MYSQL_PORT
    });
    dbConn.connect();

    dbConn.query(`DROP DATABASE ${config.NAME}`, (err, res) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, res);
      }
    });
    dbConn.end();
  },

  queryExec(config, query, cb) {
    // Setup the database connection
    const dbConn = mysql.createConnection({
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      port: config.MYSQL_PORT,
      database: config.NAME
    });
    dbConn.connect();

    // Run the query and if success, run the callback
    dbConn.query(query, (err) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, true);
      }
    });
    dbConn.end();
  }
};

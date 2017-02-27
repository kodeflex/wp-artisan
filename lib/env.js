module.exports = {
  init: {
    dir: 'site'
  },
  config: {
    allowUpdate: [
      'mysqlDbHost',
      'mysqlDbPort',
      'mysqlDbUser',
      'mysqlDbPwd',
      'mysqlDbName'
    ]
  },
  templates: {
    config: 'site.json',
    wpConfig: 'wp-config.php',
    gitignore: '.gitignore'
  },
  server: {
    host: 'localhost',
    defaultPort: '8081'
  },
  deleteList: [
    '<siteDir>/wp-config-sample.php',
    '<siteDir>/readme.html',
    '<siteDir>/wp-content/plugins/akismet',
    '<siteDir>/wp-content/plugins/hello.php'
  ]
};

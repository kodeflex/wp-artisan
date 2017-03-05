module.exports = {
  init: {
    dir: 'site'
  },
  config: {
    allowUpdate: [
      'MYSQL_HOST',
      'MYSQL_PORT',
      'MYSQL_USER',
      'MYSQL_PASSWORD',
      'NAME'
    ]
  },
  templates: {
    config: 'site.json',
    wpConfig: 'wp-config.php',
    gitignore: '.gitignore',
    styleFile: 'theme/style.css',
    index: 'theme/index.php'
  },
  resources: {
    screenshot: 'screenshot.png'
  },
  server: {
    host: 'localhost',
    defaultPort: '8080'
  },
  deleteList: [
    '<siteDir>/wp-config-sample.php',
    '<siteDir>/readme.html',
    '<siteDir>/wp-content/plugins/akismet',
    '<siteDir>/wp-content/plugins/hello.php'
  ]
};

module.exports = {
  defaults: {
    installDir: 'web',
    config: 'config.json',
    server: {
      host: 'localhost',
      port: '8080'
    }
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
  extendedPlatforms: [ ], // Eg. 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  resources: {
    screenshot: 'screenshot.png'
  },
  deleteList: [
    '<siteDir>/wp-config-sample.php',
    '<siteDir>/readme.html',
    '<siteDir>/wp-content/plugins/akismet',
    '<siteDir>/wp-content/plugins/hello.php'
  ]
};

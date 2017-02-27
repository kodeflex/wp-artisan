module.exports = {
  init: {
    dir: 'site'
  },
  templates: {
    config: 'site.json',
    wpConfig: 'wp-config.php',
    gitignore: '.gitignore'
  },
  deleteList: [
    '<siteDir>/wp-config-sample.php',
    '<siteDir>/readme.html',
    '<siteDir>/wp-content/plugins/akismet',
    '<siteDir>/wp-content/plugins/hello.php'
  ]
};

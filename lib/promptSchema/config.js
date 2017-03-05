module.exports = [
  {
    type: 'input',
    name: 'site.name',
    message: 'Enter the site name'
  },
  {
    type: 'input',
    name: 'db.MYSQL_HOST',
    message: 'MYSQL Database Host',
    default: '127.0.0.1'
  },
  {
    type: 'input',
    name: 'db.MYSQL_PORT',
    message: 'MYSQL Database Port',
    default: '3306'
  },
  {
    type: 'input',
    name: 'db.MYSQL_USER',
    message: 'MYSQL Database User',
    default: 'root'
  },
  {
    type: 'password',
    name: 'db.MYSQL_PASSWORD',
    message: 'MYSQL Database Password',
    default: ''
  },
  {
    type: 'input',
    name: 'db.NAME',
    message: 'MYSQL Database Name',
    validate(value) {
      if (!value || value.trim() === '') {
        return 'Please must provide a database name here!';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'db.TBL_PREFIX',
    message: 'MYSQL Database Table Prefix',
    default: 'wp_'
  },
  {
    type: 'input',
    name: 'server.host',
    message: 'Enter the url host',
    default: 'localhost'
  },
  {
    type: 'input',
    name: 'server.port',
    message: 'Enter the the port number',
    default: '8080'
  },
  {
    type: 'confirm',
    name: 'install.confirm',
    message: 'Run Install script?',
    default: true
  }
];

module.exports = [
  {
    type: 'input',
    name: 'siteName',
    message: 'Enter the site name'
  },
  {
    type: 'input',
    name: 'mysqlDbHost',
    message: 'MYSQL Database Host',
    default: '127.0.0.1'
  },
  {
    type: 'input',
    name: 'mysqlDbPort',
    message: 'MYSQL Database Port',
    default: '3306'
  },
  {
    type: 'input',
    name: 'mysqlDbUser',
    message: 'MYSQL Database User',
    default: 'root'
  },
  {
    type: 'input',
    name: 'mysqlDbPwd',
    message: 'MYSQL Database Password',
    default: ''
  },
  {
    type: 'input',
    name: 'mysqlDbName',
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
    name: 'mysqlDbTblPrefix',
    message: 'MYSQL Database Table Prefix',
    default: 'wp_'
  },
  {
    type: 'confirm',
    name: 'doInstall',
    message: 'Run Install script?',
    default: true
  }
];

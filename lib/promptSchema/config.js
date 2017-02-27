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
    default: function () {
      return '127.0.0.1';
    }
  },
  {
    type: 'input',
    name: 'mysqlDbPort',
    message: 'MYSQL Database Port',
    default: function () {
      return '3306';
    }
  },
  {
    type: 'input',
    name: 'mysqlDbUser',
    message: 'MYSQL Database User',
    default: function () {
      return 'root';
    }
  },
  {
    type: 'input',
    name: 'mysqlDbPwd',
    message: 'MYSQL Database Password',
    default: function () {
      return '';
    }
  },
  {
    type: 'input',
    name: 'mysqlDbName',
    message: 'MYSQL Database Name',
    validate: function (value) {
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
    default: function () {
      return 'wp_';
    }
  }
];

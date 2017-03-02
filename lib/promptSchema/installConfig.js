module.exports = [
  {
    type: 'input',
    name: 'siteName',
    message: 'Enter the site name',
    default: ''
  },
  {
    type: 'input',
    name: 'siteUrl',
    message: 'Enter the site url',
    default: ''
  },
  {
    type: 'input',
    name: 'adminUser',
    message: 'Enter the admin user name',
    default: 'admin'
  },
  {
    type: 'input',
    name: 'adminEmail',
    message: 'Enter the admin email',
    validate(email) {
      if (!email || (email.trim() === '') || (email.indexOf('@') === -1)) {
        return 'Please enter a valid e-mail address!';
      }
      return true;
    }
  },
  {
    type: 'password',
    name: 'adminPwd',
    message: 'Enter the admin user password',
    default: 'admin'
  }
];

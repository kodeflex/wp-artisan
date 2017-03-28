module.exports = [
  {
    type: 'input',
    name: 'install.user',
    message: 'Enter the admin user name',
    default: 'admin'
  },
  {
    type: 'input',
    name: 'install.userEmail',
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
    name: 'install.userPwd',
    message: 'Enter the admin user password',
    default: 'admin'
  }
];

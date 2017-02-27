module.exports = [
  {
    type: 'input',
    name: 'themeName',
    message: 'Enter the theme name',
    validate: function (value) {
      if (!value || value.trim() === '') {
        return 'Please provide a theme name here!';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'themeUri',
    message: 'Enter the theme URI',
    default: ''
  },
  {
    type: 'input',
    name: 'author',
    message: 'Enter author name',
    default: ''
  },
  {
    type: 'input',
    name: 'authorUri',
    message: 'Enter author URI',
    default: ''
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter the Description',
    default: ''
  },
  {
    type: 'input',
    name: 'version',
    message: 'Enter the version',
    default: '1.0.0'
  }
];

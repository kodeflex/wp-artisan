const inquirer = require('inquirer');

const Utils = require('./utils');
const Logs = require('./logs');
const artisan = require('./artisan');

const promptSchema = require('../promptSchema');
const env = require('../env');

module.exports = {
  init() {
    // check if already initialized a project
    if (!artisan.isInitialized()) {
      Logs.show('working-directory-invalid', {
        type: 'Error',
        message: null,
        params: {}
      });
      return;
    }

    // Logs
    Logs.show('prompt-theme-config', {
      type: 'Info',
      message: null,
      params: {}
    });

    inquirer
      .prompt(promptSchema.theme)
      .then((config) => {
        const themeName = config.themeName
          .trim()
          .toLowerCase()
          .replace(/[ .!@#$%^*()\\/?<>[\]{}&+=|;:"']/g, '-')
          .replace(/(-)+/g, '-');

        // Init.
        Logs.show('theme-init', {
          type: 'Info',
          message: null,
          params: {
            themeName
          }
        });

        // create theme directory
        Utils.mkdirSync(`${Utils.getWorkingDir()}/${env.init.dir}/wp-content/themes/${themeName}`);

        // add `style.css`
        Utils.writeFileSync(
          `${Utils.getWorkingDir()}/${env.init.dir}/wp-content/themes/${themeName}/style.css`,
          Utils.getTemplatePath(env.templates.styleFile),
          config
        );

        // add `index.php`
        Utils.writeFileSync(
          `${Utils.getWorkingDir()}/${env.init.dir}/wp-content/themes/${themeName}/index.php`,
          Utils.getTemplatePath(env.templates.index),
          null
        );

        // copy `screenshot.png`
        Utils.copyFileSync(
          `${Utils.getResourcePath(env.resources.screenshot)}`,
          `./${env.init.dir}/wp-content/themes/${themeName}/`
        );

        Logs.show('theme-init-success', {
          type: 'Info',
          message: null,
          params: {
            themeDir: `${Utils.getWorkingDir()}/${env.init.dir}/wp-content/themes/${themeName}/`
          }
        });
      }
    );
  }
};

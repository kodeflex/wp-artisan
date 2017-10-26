/* eslint max-len: 0 */

const inquirer = require("inquirer");

const Utils = require("./utils");
const Logs = require("./logs");
const artisan = require("./artisan");

const promptSchema = require("../promptSchema");
const env = require("../env");

module.exports = {
  init(options = null) {
    // check if already initialized a project
    if (!artisan.isInitialized()) {
      Logs.show("working-directory-invalid", {
        type: "Error",
        message: null,
        params: {}
      });
      return;
    }

    if (options && options.clean) {
      // Show warning
      Logs.show("theme-clean-dir", {
        type: "Warn",
        message: null,
        params: {}
      });
    }

    // Logs
    Logs.show("prompt-theme-config", {
      type: "Info",
      message: null,
      params: {}
    });

    inquirer.prompt(promptSchema.theme).then(config => {
      const themeName = config.themeName
        .trim()
        .toLowerCase()
        .replace(/[ .!@#$%^*()\\/?<>[\]{}&+=|;:"']/g, "-")
        .replace(/(-)+/g, "-");

      // Init.
      Logs.show("theme-init", {
        type: "Info",
        message: null,
        params: {
          themeName
        }
      });

      // [TODO]
      // Improve the logic here.
      // --clean=true
      if (options && options.clean) {
        const dirList = Utils.getDirContents(
          `${Utils.getWorkingDir()}/${env.defaults
            .installDir}/wp-content/themes/`
        );
        // Exclude `index.php`
        dirList.splice(dirList.indexOf("index.php"), 1);

        // set directory paths
        dirList.forEach((dir, index) => {
          dirList[index] = `${Utils.getWorkingDir()}/${env.defaults
            .installDir}/wp-content/themes/${dir}`;
        });

        // Clean the theme directory
        Utils.forceUnlink(dirList);
      }

      // create theme directory
      Utils.mkdirSync(
        `${Utils.getWorkingDir()}/${env.defaults
          .installDir}/wp-content/themes/${themeName}`
      );

      // add `style.css`
      Utils.writeFileSync(
        `${Utils.getWorkingDir()}/${env.defaults
          .installDir}/wp-content/themes/${themeName}/style.css`,
        Utils.getTemplatePath("theme/style.css"),
        config
      );

      // add `index.php`
      Utils.writeFileSync(
        `${Utils.getWorkingDir()}/${env.defaults
          .installDir}/wp-content/themes/${themeName}/index.php`,
        Utils.getTemplatePath("theme/index.php"),
        null
      );

      // copy `screenshot.png`
      Utils.copyFileSync(
        `${Utils.getResourcePath(env.resources.screenshot)}`,
        `./${env.defaults.installDir}/wp-content/themes/${themeName}/`
      );

      Logs.show("theme-init-success", {
        type: "Info",
        message: null,
        params: {
          themeDir: `${Utils.getWorkingDir()}/${env.defaults
            .installDir}/wp-content/themes/${themeName}/`
        }
      });
    });
  }
};

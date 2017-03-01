# wp-artisan

[![npm version](https://badge.fury.io/js/wp-artisan.svg)](https://badge.fury.io/js/wp-artisan) [![dependencies Status](https://david-dm.org/kodeflex/wp-artisan/status.svg)](https://david-dm.org/kodeflex/wp-artisan)

A command-line toolkit for work on custom [WordPress](http://wordpress.org/) developments in an efficient way.

> This project is still at early stage.
> I'd love to hear from anyone who wish to contribute. Feel free to submit issues, feature requests and any suggestions you mind. PRs are welcome! :-)

> This project forked form [WordPress CLI](https://github.com/thinkholic/wordpress-cli/)

## Prerequisites

You must require to install and configure followings on your development workstation first;
* Nodejs
* PHP 5.4 or higher
* MySQL

## Installation

```
npm install -g wp-artisan
```

## Usage

### wp init

```
wp init [path]
```

This perform following tasks;

* Prompt for site configuration
* Fetch and download WordPress latest version
* Creating directory structure and `site.json`
* Creating database
* Install WordPress
* Intililize WordPress development envirement

You can either create a working directory first and run `wp init` in there or you just can run `wp init example.com` or `wp init "My WordPress Site"` for that.

### wp serve

Once you created and initialized the development environment, you can start a server instance on http://localhost:8888 with wp serve (Or wp s).

```
cd example.com
wp serve
```

You can change the port with the --port (Or -p) flag like this.

```
wp serve -p 3000
```

### wp config

```
wp config -u <key> <val>
```

Update both `site.json` and `wp-config.php` along with the database.

### wp plugin

You can add or remove plugins with this.

```
wp plugin add <plunginName>
wp plugin remove <plunginName>
```

### wp template

Create empty theme canvas on the theme directory. Once you run this command, it'll prompt for user inputs related to creating a theme.

```
wp template init
```

## Contribution Guide

### Setup the development environment

You need to install and configure above `prerequisites` as listed.
Then;

```
git clone git@github.com:kodeflex/wp-artisan.git
cd wp-artisan
git checkout dev
npm link
```

### Pull requests

Send all the PRs to `dev` branch. We keep master branch only for final releases and all the development works on the `dev`.

## License

MIT

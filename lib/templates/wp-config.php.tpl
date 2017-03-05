<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', '<%= db.NAME %>');

/** MySQL database username */
define('DB_USER', '<%= db.MYSQL_USER %>');

/** MySQL database password */
define('DB_PASSWORD', '<%= db.MYSQL_PASSWORD %>');

/** MySQL hostname */
define('DB_HOST', '<%= db.MYSQL_HOST %>:<%= db.MYSQL_PORT %>');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', '<%= db.CHARSET %>');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '<%= db.COLLATE %>');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = '<%= db.TBL_PREFIX %>';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', <%= wp.WP_DEBUG %>);

/**
 * Speed: Set WordPress Post Revisions
 *
 * @parm Boolean or Interger 
 */
define('WP_POST_REVISIONS', <%= wp.WP_POST_REVISIONS %>);

/**
 * Change the Autosave Interval
 */
define('AUTOSAVE_INTERVAL', <%= wp.AUTOSAVE_INTERVAL %> ); // the value should be in seconds!

/* PHP Memory */
define( 'WP_MEMORY_LIMIT', '<%= wp.WP_MEMORY_LIMIT %>' );
define( 'WP_MAX_MEMORY_LIMIT', '<%= wp.WP_MAX_MEMORY_LIMIT %>' );

/**
 * Speed: Change the Filesystem Method
 * 
 * The code below makes it easier for you by forcing the filesystem
 * to use direct file I/O request from within PHP – in other words, 
 * you won’t need to enter FTP credentials anymore.
 */
define('FS_METHOD', '<%= wp.FS_METHOD %>');

/* SSL */
define( 'FORCE_SSL_LOGIN', <%= wp.FORCE_SSL_LOGIN %>);
define( 'FORCE_SSL_ADMIN', <%= wp.FORCE_SSL_ADMIN %>);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

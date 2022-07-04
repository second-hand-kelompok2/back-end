/**
 * @file Manages database connection configuration.
 * @author Fikri Rahmat Nurhidayat
 */

/** Destruct environment variable to get database configuration */
const path = require("path");
require("dotenv").config(__dirname + "/../.env");

const DB_TEST_FILE_PATH = path.join(__dirname, "../db/test.sqlite");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

module.exports = {
  // Elephant SQL
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    ssl: true,
  },
  // SQLite
  test: {
    storage: DB_TEST_FILE_PATH,
    logging: false,
    dialect: "sqlite",
  },
  // Heroku Postgres
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};


// const {
//   DB_USERNAME = null,
//   DB_PASSWORD = null,
//   DB_HOST = "127.0.0.1",
//   DB_NAME = "database",
// } = process.env;

// module.exports = {
//   development: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_development`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
//   test: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_test`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
//   production: {
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: `${DB_NAME}_production`,
//     host: DB_HOST,
//     dialect: "postgres",
//   },
// };

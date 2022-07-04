/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const post = require("./post");
const userController = require("./userController");
const productController = require("./productController");
const transactionController = require("./transactionController");

module.exports = {
  post,
  userController,
  productController,
  post,
  transactionController,
};

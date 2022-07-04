"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Transaction.belongsTo(models.User, {
      //   foreignKey: "user_id",
      //   as: "users",
      // });
      Transaction.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
    }
  }
  Transaction.init(
    {
      seller_id: DataTypes.STRING,
      buyer_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

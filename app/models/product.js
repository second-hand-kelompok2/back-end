"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Product.hasMany(models.Transaction, {
        foreignKey: "product_id",
        as: "transactions",
      });
      Product.hasMany(models.Image, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      user_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_category: DataTypes.STRING,
      product_desc: DataTypes.STRING,
      product_price: DataTypes.INTEGER,
      location: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  // Product.associate = (models) => {

  // }
  return Product;
};

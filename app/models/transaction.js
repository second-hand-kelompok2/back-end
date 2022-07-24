'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Transaction.init({
    buyerId: DataTypes.INTEGER,
    sllerId: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    req_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: "user_id",
        as: "product",
      });
      // User.hasMany(models.Transaction, {
      //   foreignKey: "user_id",
      //   as: "transaction",
      // });
      User.hasMany(models.Notification, {
        foreignKey: "notification_id",
        as: "notification",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_img: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      kota: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Posts, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.Likes, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      nickname: {
        type: DataTypes.STRING,
      },

      snsId: {
        type: DataTypes.STRING,
      },

      provider: {
        type: DataTypes.STRING,
      },

      imageProfile: {
        type: DataTypes.STRING,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'postId',
      });

      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Likes.init(
    {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
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
      modelName: 'Likes',
    }
  );
  return Likes;
};

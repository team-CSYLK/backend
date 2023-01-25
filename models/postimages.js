'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
    static associate(models) {
      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'postId',
      })
    }
  }
  PostImages.init(
    {
      imageId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      url: {
        allowNull: false,
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
      modelName: 'PostImages',
    }
  );
  return PostImages;
};

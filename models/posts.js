'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });

      this.hasMany(models.PostImages, {
        sourceKey: 'postId',
        foreignKey: 'postId',
      });

      this.hasOne(models.Likes, {
        sourceKey: 'postId',
        foreignKey: 'postId',
      });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      postContent: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      place: {
        allowNull: false,
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
      modelName: 'Posts',
    }
  );
  return Posts;
};

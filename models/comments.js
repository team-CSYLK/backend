'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });

      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'postId',
      });
    }
  }
  Comments.init(
    {
      commentId: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      userId: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },

      postId: {
        // allowNull: false,
        type: DataTypes.INTEGER,
      },

      commentContent: {
        // allowNull: false,
        type: DataTypes.STRING,
      },

      createdAt: {
        // allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};

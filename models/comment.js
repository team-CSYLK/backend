'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Member, {
        targetKey: 'mId',
        foreignKey: 'mId',
      });

      this.belongsTo(models.Quiz, {
        targetKey: 'qId',
        foreignKey: 'qId',
      });

      this.hasOne(models.CommentLike, {
        targetKey: 'cId',
        foreignKey: 'cId',
      });
    }
  }
  Comment.init(
    {
      cId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      mId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      qId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      comment: {
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
      modelName: 'Comment',
    }
  );
  return Comment;
};

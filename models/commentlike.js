'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    static associate(models) {
      this.belongsTo(models.Comment, {
        targetKey: 'cId',
        foreignKey: 'cId',
      });
    }
  }
  CommentLike.init(
    {
      cLId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      cId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      mId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      commentLikeStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
      modelName: 'CommentLike',
    }
  );
  return CommentLike;
};

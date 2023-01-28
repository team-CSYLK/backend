'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizLike extends Model {
    static associate(models) {
      this.belongsTo(models.Quiz, {
        targetKey: 'qId',
        foreignKey: 'qId',
      });
    }
  }
  QuizLike.init(
    {
      qLId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      qId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      mId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      likeStatus: {
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
      modelName: 'QuizLike',
    }
  );
  return QuizLike;
};

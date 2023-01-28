'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      this.belongsTo(models.Member, {
        targetKey: 'mId',
        foreignKey: 'mId',
      });

      this.hasOne(models.QuizLike, {
        sourceKey: 'qId',
        foreignKey: 'qId',
      });

      this.hasMany(models.Comment, {
        sourceKey: 'qId',
        foreignKey: 'qId',
      });
    }
  }
  Quiz.init(
    {
      qId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      answer: {
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
      modelName: 'Quiz',
    }
  );
  return Quiz;
};

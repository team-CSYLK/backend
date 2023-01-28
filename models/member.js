'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      this.hasMany(models.Quiz, {
        sourceKey: 'mId',
        foreignKey: 'mId',
      });

      this.hasMany(models.Comment, {
        sourceKey: 'mId',
        foreignKey: 'mId',
      });

      this.hasMany(models.RefreshToken, {
        sourceKey: 'mId',
        foreignKey: 'mId',
      });
    }
  }
  Member.init(
    {
      mId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      memberId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickname: {
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
      modelName: 'Member',
    }
  );
  return Member;
};

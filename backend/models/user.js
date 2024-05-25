'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes, commonFields) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // one to many (has many)
    }
  }
  User.init({    
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    avatar:  DataTypes.STRING,
    nickName: {
      // unique: true,
      defaultValue: "Default Nickname",
      type: DataTypes.STRING,
    },
    firstName: {
      // allowNull: false,
      // defaultValue: "Default",
      type: DataTypes.STRING
    },
    lastName: {
      // allowNull: false,
      // defaultValue: "Name",
      type: DataTypes.STRING
    },
    displayName: DataTypes.STRING,
    onlineAvailability: DataTypes.INTEGER,
    ...commonFields, // Include the common fields
  },{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude the fields
    }
  });


  return User;
};
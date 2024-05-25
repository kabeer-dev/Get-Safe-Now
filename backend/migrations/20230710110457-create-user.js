'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      nickName: {
        // unique: true,
        defaultValue: "Default Nickname",
        type: Sequelize.STRING,
      },
      
      firstName: {
        // allowNull: false,
        defaultValue: "Default",
        type: Sequelize.STRING
      },
      lastName: {
        // allowNull: false,
        defaultValue: "Name",
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING,
      },
      onlineAvailability: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
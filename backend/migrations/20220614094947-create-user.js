"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pseudo: {
        type: Sequelize.STRING(50),
      },
      firstname: {
        type: Sequelize.STRING(50),
      },
      lastname: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(150),
      },
      password: {
        type: Sequelize.STRING(150),
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
  //    isAdmin: {
  //      type: Sequelize.BOOLEAN,
  //      allowNull: false,
  //      default: false,
  //    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users")
  },
}
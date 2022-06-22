"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Like", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      userPseudo:{
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "User",
          key: "pseudo"
        }
      },
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
    await queryInterface.dropTable("Like")
  },
}
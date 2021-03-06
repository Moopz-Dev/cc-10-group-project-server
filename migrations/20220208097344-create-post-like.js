'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Post_likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
        },
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'posts',
          },
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Post_likes');
  },
};

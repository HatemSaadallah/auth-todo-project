'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'created_by', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'created_by', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};

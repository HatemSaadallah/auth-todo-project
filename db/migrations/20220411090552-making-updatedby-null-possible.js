'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'updated_by', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'updated_by', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};

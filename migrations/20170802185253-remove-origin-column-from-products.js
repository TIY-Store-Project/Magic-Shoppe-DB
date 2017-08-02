'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'products',
      'origin',
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'products',
      'origin',
      {
        type: Sequelize.STRING
      }
    )
  }
};

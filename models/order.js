'use strict';
module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define('order', {
    quantity: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    order.belongsTo(models.product, {
      as: 'product',
      foreignKey: 'productID'
    })
  }
  return order;
};

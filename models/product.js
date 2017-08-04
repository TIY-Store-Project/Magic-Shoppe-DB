'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});

  product.associate = function(models) {
    product.hasMany(models.review, {as: 'reviews', foreignKey: 'productID'})
  }
  return product;
};

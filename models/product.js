'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};

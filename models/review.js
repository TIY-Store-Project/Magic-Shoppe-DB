'use strict';
module.exports = function(sequelize, DataTypes) {
  var review = sequelize.define('review', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  review.associate = function(models) {
    review.belongsTo(models.product, {
      as: 'product',
      foreignKey: 'productID'
    })
  }
  return review;
};

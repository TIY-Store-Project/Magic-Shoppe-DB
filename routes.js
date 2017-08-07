'use strict';

const express = require('express');
const passport = require('passport');
const Router = express.Router();
const models = require('./models');
const Sequelize = require('sequelize');
const Product = models.product;
const Review = models.review;
const Order = models.order;



// #CREATE
// create a new product
Router.post('/newproduct', function(req, res) {
  let newProduct = Product.build({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  });
  console.log(newProduct);
  newProduct.save(function(err, newProduct) {
    if (err) return console.error(err);
    res.json(newProduct);
  })
});



// create a new review
Router.post('/newreview', function(req, res) {
  let newReview = Review.build({
    name: req.body.name,
    content: req.body.content,
    rating: req.body.rating,
    productID: req.body.productID
  });
  newReview.save(function(err, newReview) {
    if (err) return console.error(err);
    res.json(newReview);
  });
});



// #READ
// get all products in an array
Router.get('/products', function(req, res) {
  console.log('GET /products');
  Product.findAll().then(products => {
    res.json(products)
  })
});

// get a single product by id, and it's reviews
Router.get('/products/:id', function(req, res) {
  Product.findOne({
    where: { id: req.params.id },
    include: [{
      model: models.review,
      as: 'reviews'
    }]
  }).then(function(product) {
    res.json(product);
  })
});

// get all reviews in a array
Router.get('/reviews', function(req, res) {
  console.log('GET /reviews/' + req.params.id);
  Review.findAll().then(reviews => {
    res.json(reviews)
  });
});

// get a single review by id
Router.get('/reviews/:id', function(req, res) {
  console.log('GET /reviews/' + req.params.id);
  Review.findById(req.params.id, function(err, review) {
    if (err) return console.error(err);
    res.json(review);
  });
});





//
// Router.delete('/product/:id', function(req, res) {
//   console.log('DELETE /product/', req.params.id);
//   Product.findByIdAndRemove(req.params.id, function(err, product) {
//     if (err) return console.error(err);
//     let msg = {
//       message: 'delete successful!',
//       product: product
//     };
//     res.json(msg);
//   });
// });
//
// Router.delete('/review/:id', function(req, res) {
//   console.log('DELETE /review/' + req.params.id);
//   Review.findByIdAndRemove(req.params.id, function(err, review) {
//     if (err) return console.error(err);
//     let msg = {
//       message: 'delete successful!',
//       review: review
//     };
//     res.json(msg);
//   });
// });
//
// // this should be moved once we define which endpoints need auth.
// Router.use(passport.authenticate('basic', { session: false }));
//
module.exports = Router;

'use strict';

const express = require('express');
const passport = require('passport');
const Router = express.Router();
const models = require('./models');
const Sequelize = require('sequelize');


const Product = models.product;
const Review = models.review;
const Order = models.order;


// // create a new product
// Router.post('/newproduct', function(req, res) {
//   console.log('POST /newproduct');
//   const newProduct = new Product({
//     userId: req.body.userId,
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price
//   });
//   if (req.body.picture) {
//     newProduct.picture = req.body.picture;
//   }
//   newProduct.save(function(err, newProduct) {
//     if (err) return console.error(err);
//     res.json(newProduct);
//   });
// });
//
// // create a new review
// Router.post('/newreview', function(req, res) {
//   console.log('POST /newreview');
//   const newReview = new Review({
//     productId: req.body.productId,
//     userId: req.body.userId,
//     username: req.body.username,
//     rating: req.body.rating
//   });
//   if (req.body.review) {
//     newReview.review = req.body.review;
//   }
//   newReview.save(function(err, newReview) {
//     if (err) return console.error(err);
//     res.json(newReview);
//   });
// });

// #READ
// get all products in an array, plus an average of the reviews for each
Router.get('/products', function(req, res) {
  console.log('GET /products');
  Product.findAll().then(products => {
    console.log(products.image);
    res.json(products)
  })
});

// get a single product by id, and it's reviews
// Router.get('/products/:id', function(req, res) {
//   console.log('GET /products/' + req.params.id);
//   Product.findById(req.params.id, function(err, product) {
//     if (err) return console.error(err);
//     Review.find({ productId: req.params.id }, function(err, reviews) {
//       if (err) return console.error(err);
//       res.json({
//         product: product.name,
//         picture: product.picture,
//         price: product.price,
//         description: product.description,
//         reviews: reviews
//       });
//     });
//   });
// });
//
// // get all users
// Router.get('/users', function(req, res) {
//   console.log('GET /users');
//   User.find({}, function(err, users) {
//     if (err) return console.error(err);
//     res.json({ results: users });
//   });
// });
//
// // get a user by id
// Router.get('/user/:id', function(req, res) {
//   console.log('GET /user/' + req.params.id);
//   User.findById(req.params.id, function(err, user) {
//     if (err) return console.error(err);
//     res.json(user);
//   });
// });
//
// // get a single review by id
// Router.get('/review/:id', function(req, res) {
//   console.log('GET /review/' + req.params.id);
//   Review.findById(req.params.id, function(err, review) {
//     if (err) return console.error(err);
//     res.json(review);
//   });
// });
//
// // #UPDATE
// // update a user account by id
// Router.put('/user/:id', function(req, res) {
//   console.log('PUT /user/' + req.params.id);
//   User.findById(req.params.id, function(err, user) {
//     if (err) return console.error(err);
//     user.username = req.body.username || user.username;
//     user.password = req.body.password || user.password;
//     user.admin = req.body.admin || user.admin;
//     user.save(function(err, user) {
//       if (err) return console.error(err);
//       res.json(user);
//     });
//   });
// });
//
// // update a product by id
// Router.put('/product/:id', function(req, res) {
//   console.log('PUT /product/' + req.params.id);
//   Product.findById(req.params.id, function(err, product) {
//     if (err) return console.error(err);
//     product.userId = req.body.userId || product.userId;
//     product.name = req.body.name || product.name;
//     product.description = req.body.description || product.description;
//     product.price = req.body.price || product.price;
//     if (product.picture || req.body.picture) {
//       product.picture = req.body.picture || product.picture;
//     }
//     product.save(function(err, product) {
//       if (err) return console.error(err);
//       res.json(product);
//     });
//   });
// });
//
// // update a review by id
// Router.put('/review/:id', function(req, res) {
//   console.log('PUT /review/' + req.params.id);
//   Review.findById(req.params.id, function(err, review) {
//     if (err) return console.error(err);
//     review.productId = req.body.productId || review.productId;
//     review.userID = req.body.userId || review.userId;
//     review.username = req.body.username || review.username;
//     review.rating = req.body.rating || review.rating;
//     if (review.review || req.body.review) {
//       review.review = req.body.review || review.review;
//     }
//     review.save(function(err, review) {
//       if (err) return console.error(err);
//       res.json(review);
//     });
//   });
// });
//
// // #DELETE
// // delete a user
// Router.delete('/user/:id', function(req, res) {
//   console.log('DELETE /user/' + req.params.id);
//   User.findByIdAndRemove(req.params.id, function(err, user) {
//     if (err) return console.error(err);
//     let msg = {
//       message: 'delete successful!',
//       user: user
//     };
//     res.json(msg);
//   });
// });
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

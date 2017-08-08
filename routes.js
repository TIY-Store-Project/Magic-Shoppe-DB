'use strict';

const express = require('express');
const passport = require('passport');
const Router = express.Router();
const models = require('./models');
const Sequelize = require('sequelize');
const Product = models.product;
const Review = models.review;
const Order = models.order;



// CREATE
// create a new product
Router.post('/newproduct', function(req, res) {
  let newProduct = Product.build({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  });
  newProduct.save().then(function(newProduct) {
    res.json(newProduct)
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'ERROR! WARNING! ABORT! ABORT!'
    })
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
  newReview.save().then(function(newReview) {
    res.json(newReview)
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'ERROR! WARNING! ABORT! ABORT!'
    })
  });
});

// create a new order
Router.post('/neworder', function(req, res) {
  let newOrder = Order.build({
    quantity: req.body.quantity,
    productID: req.body.productID
  });
  newOrder.save().then(function(newOrder) {
    res.json(newOrder)
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'ERROR! WARNING! ABORT! ABORT!'
    })
  });
});



// READ
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

// get all orders in a array
Router.get('/orders', function(req, res) {
  Order.findAll().then(orders => {
    res.json(orders)
  });
});

// get a single order by id
Router.get('/orders/:id', function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (err) return console.error(err);
    res.json(order);
  });
});



// UPDATE
// change quantity of an order by id
Router.put('updateorder/:id', function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (err) return console.error(err);
    order.quantity = req.body.quantity || order.quantity;
    order.productID = req.body.productID || order.productID;
    if (order.order || req.body.order) {
      order.order = req.body.order || order.order;
    }
    order.save(function(err, order) {
      if (err) return console.error(err);
      res.json(order);
    });
  });
});



module.exports = Router;

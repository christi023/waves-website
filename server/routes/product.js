const express = require('express');
//const mongoose = require('mongoose');

//objectId = require('mongoose').Types.ObjectId();
// Models
const { Product } = require('../models/product');
// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100&skip=5
router.get('/api/product/articles', (req, res) => {
  // set the order
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'; // set sortBy
  let limit = req.query.limit ? parseInt(req.query.limit) : 100; // set limit
  // Bring from database
  Product.find()
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

// ------------- FETCH PRODUCTS/ARTICLES BY ID -----------------
router.get('/api/product/articles_by_id', (req, res) => {
  let id = req.query.id.split(',');

  // Making request
  Product.find({ _id: { $in: id } })
    .populate('brand')
    .populate('wood')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });

  //let item = req.query.id.split(',');
  //res.json(item);
  /*let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = []; // create split for ids // convert to an array
    items = ids.map((item) => {
      //console.log(items);
      return mongoose.Types.ObjectId(item); // convert to obj id from mongoose .isValid
    });
  }
  // MAKING THE REQUEST
  Product.find({ _id: { $in: items } })
    .populate('brand')
    .populate('wood')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });*/
});

// ------------- POST A PRODUCT -------------------
router.post('/api/product/article', auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

module.exports = router;

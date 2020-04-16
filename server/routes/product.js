const express = require('express');
const mongoose = require('mongoose');

//objectId = require('mongoose').Types.ObjectId();
// Models
const { Product } = require('../models/product');
// Middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();
//router.use(express.urlencoded({ extended: true }));

// ------------- FETCH PRODUCTS/ARTICLES BY ID -----------------
router.get('/api/product/articles_by_id', (req, res) => {
  /*let ids = req.query.id.split(',');
  Product.find({ ids })
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));*/

  /*let item = req.query.id;
  Product.find({ _id: item._id }).then((result) => {
    assert(result._id.toString() === item._id.toString());
    done();
  });*/
  let type = req.query.type;
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
  Product.findById({ _id: { $in: items } }).exec((err, docs) => {
    return res.status(200).send(docs);
  });
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

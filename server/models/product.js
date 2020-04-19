const mongoose = require('mongoose');
// make reference to mongoose schema
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxLength: 100,
    },
    description: {
      required: true,
      type: String,
      maxLength: 100000,
    },
    price: {
      required: true,
      type: Number,
      maxLength: 255,
    },
    brand: {
      // telling mongoose this brand is obj id
      type: Schema.Types.ObjectId,
      ref: 'Brand', // ref to database collection called Brand
      required: true,
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    available: {
      // check to see if guitar is available for purchase
      required: true,
      type: Boolean,
    },
    wood: {
      // telling mongoose this brand is obj id
      type: Schema.Types.ObjectId,
      ref: 'Wood', // ref to database collection called Wood
      required: true,
    },
    frets: {
      required: true,
      type: Number,
    },
    sold: {
      // track how many guitars are sold
      type: Number,
      maxLength: 100,
      default: 0, // default sold will be equal to nothing whenever we enter a guitar, it shows we sold 0.
    },
    publish: {
      // if guitar is enter into database but its not for sale
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
); // when item was entered in database & when it was updated. Generated automatically by mongo when new product is generated

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    item: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: String,
    },
    sizes: {
      type:  String,
    },
    color: {
      type:  String,
    },
    stock: {
      type:  String,
    },
     price: {
      type:  String,
    },
    gender: {
    type:  String,
    },
  },
);


module.exports = mongoose.model("products",  productSchema);


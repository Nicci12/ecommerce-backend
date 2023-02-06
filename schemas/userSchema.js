const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    surname: {
      type: String,
      unique: false,
    },

    email: {
      type: String,
    },
    password: {
      type: String,
    },
    repassword: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId}],
    cart:[{type: mongoose.Schema.Types.ObjectId}],
  //   cart: [
  //     {
  //         product: {
  //             type: mongoose.Schema.Types.ObjectId,
  //             ref: 'Product'
  //         },
  //         price: {
  //             type: String,
  //         },
  //         stock: {
  //             type: String,
  //             default: 1
  //         }
  //     }
  // ]
  },
  {
    timestamps: true,
    collection: "users",
  }
);


module.exports = mongoose.model("users",  userSchema);


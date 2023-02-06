const mongoose = require("mongoose");
const User = require("../schemas/userSchema");
const Product = require("../schemas/productSchema");
const { productById } = require("../models/productModel");
const { signUpModel } = require("../models/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req, res) {
  try {
    const { email, password, name, surname } = req.body;
    const newUser = {
      email,
      password,
      name,
      surname,
    };
    const id = await signUpModel(newUser);
    res.send({ id: id, newUser: newUser });
  } catch (err) {
    console.log(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, { maxAge: 15151252151251 });
    res.send({ user: user._id, token });
  } catch (err) {
    console.log(err);
  }
}

const getUser = async (req, res) => {
  try {
    const userId = await User.findById({ _id: req.params.id }).select({
      password: 0,
    });
    res.status(200).json(userId);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await productById(id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

const addLikedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { prodId } = req.body;
    const user = await User.findById(id);
    const alreadyAdded = user.wishlist.find((prodId) => prodId === prodId);
    if (alreadyAdded === user.wishlist) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(updatedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding item to wishlist" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { prodId } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("find product", await Product.find());
    const product = await Product.findById(prodId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    user.cart.push(product._id);
    await user.save();
    console.log("price", product.price);
    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalPrice += item.price;
    });
    return res
      .status(200)
      .json({ message: "Product added to cart", totalPrice });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error adding product to cart", error: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { prodId } = req.body;
    const deleteProduct = await User.findByIdAndUpdate(
      id,
      {
        $pull: { wishlist: prodId },
      },
      { new: true }
      );
      
      return res.status(200).json(deleteProduct);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  const removeCartProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const {prodId} = req.body
        const removeFromCart = await User.findByIdAndUpdate(
            id,
            { $pull: { cart: prodId  } },
            { new: true }
        );
        return res.status(200).json(removeFromCart);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
  };
const getLikedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const findUser = user.populate("wishlist");
    res.json(user);
  } catch (error) {
    return res.json({ msg: "Error fetching products." });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const currentUser = user.cart;
    res.json(currentUser);
  } catch (error) {
    return res.json({ msg: "Error fetching products from cart." });
  }
};


const removeLikedProducts = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  getLikedProducts,
  getCartProducts,
  getProductById,
  addLikedProducts,
  addToCart,
  deleteProduct,
  removeCartProducts,
  removeLikedProducts,
};

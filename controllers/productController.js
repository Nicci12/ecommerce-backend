const Product = require("../schemas/productSchema");
const { findProducts} = require("../models/productModel");


 const filterItems = async (req, res) => {
  try {
    const params = req.query;
    const searchedProducts = await findProducts(params);
    console.log("searched", searchedProducts)
    res.status(200).json(searchedProducts);
  } catch (err) {
    res.status(500).send({
      message: "Error creating adoption status",
      err,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const prodId = await Product.find();
    res.status(200).json(prodId);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

async function addProducts(req, res) {
  try {
    const { item, description, images, sizes, color, stock, gender, price } =
      req.body;
    const prodId = new Product({
      item: item,
      description: description,
      images: images,
      sizes: sizes,
      color: color,
      stock: stock,
      gender: gender,
      price: price,
    });
    await prodId.save();
    res.status(201).json({
      message: "Product Created Successfully",
      prodId: prodId,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating product",
      error,
    });
  }
}

module.exports = {
  getAllProducts,
  addProducts,
  getSingleProduct,
  getProductById,
  filterItems
};

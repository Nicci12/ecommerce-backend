const express = require("express");
const router = express.Router();
const { getAllProducts, addProducts, getProductById, getSingleProduct, filterItems} = require('../controllers/productController');

router.post("/addproducts", addProducts);
router.get("/", getAllProducts);
router.get("/filter", filterItems)
router.get("/:id", getSingleProduct);
router.get("/cart/:id", getProductById);

module.exports = router;
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const {getUser, addLikedProducts, getLikedProducts, getCartProducts, addToCart, deleteProduct, removeCartProducts, removeLikedProducts}=require("../controllers/usersController");
const {passwordsMatch, isNewUser, hashPwd, isExistingUser, verifyPwd} = require("../middleware/userMiddleware");
// const { validateBody } = require("../middleware/validateBody");

router.post("/signup", passwordsMatch, hashPwd, isNewUser, UsersController.signUp);
router.post("/login",  isExistingUser, verifyPwd,  UsersController.login);
router.post("/:id/wishlist", addLikedProducts);
router.post("/:id/cart", addToCart);
router.get('/:id', getUser);
router.get("/:id/wishlist", getLikedProducts);
router.get("/:id/cart", getCartProducts);
router.put("/:id/remove", deleteProduct)
router.put("/:id/removecart",  removeCartProducts)
router.put("/remove", removeLikedProducts);


module.exports = router;

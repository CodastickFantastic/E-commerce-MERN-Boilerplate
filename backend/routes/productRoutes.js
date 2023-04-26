const express = require("express");
const router = express.Router();
const {addProduct, showProducts, showProduct, updateProduct, deleteProduct} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

router.route("/add-product").post(protect, addProduct);
router.route("/all-products").get(protect, showProducts);
router.route("/:id").get(protect, showProduct).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
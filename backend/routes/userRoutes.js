const express = require("express");
const router = express.Router();
const {createUser, loginUser, addToFavourites, removeFromoFavourites} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", createUser)
router.post("/login", loginUser)
router.route("/add-favourite/:id").get(protect, addToFavourites)
router.route("/remove-favourite/:id").get(protect, removeFromoFavourites)

module.exports = router;
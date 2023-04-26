const express = require("express");
const router = express.Router();
const {createUser, loginUser, addToFavourites} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", createUser)
router.post("/login", loginUser)
router.route("/:id/add-favourite").get(protect, addToFavourites)

module.exports = router;
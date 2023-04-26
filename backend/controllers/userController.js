const JWT = require('jsonwebtoken');
const BCRYPT = require('bcryptjs');
const UserModel = require('../models/userModel');
const { response } = require('express');

// Generate JWT Token
const generateToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const createUser = async (req, res) => {
    let {name, email, password, userType} = req.body;

    // Check if all required fields are filled
    if(!name) return res.status(400).json({error: "Please enter a name"})
    if(!email) return res.status(400).json({error: "Please enter an email"})
    if(!password) return res.status(400).json({error: "Please enter a password"})

    // Check if user exists
    const userExists = await UserModel.findOne({email: email});
    if(userExists) return res.status(400).json({error: "User already exists"})
    
    // Hash Password
    const salt = await BCRYPT.genSalt(10);
    const hashedPassword = await BCRYPT.hash(password, salt);

    // Create User
    let user = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        userType: userType,
    })
    
    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({message: err});
    }
}

// @desc    Login User
// @route   POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
    let {email, password} = req.body;

    // Check if all required fields are filled
    if(!email) return res.status(400).json({error: "Please enter an email"})
    if(!password) return res.status(400).json({error: "Please enter a password"})
    
    // Check if user exists
    const User = await UserModel.findOne({email: email});
    if(User){
        // Check if password is correct
        const passwordCorrect = await BCRYPT.compare(password, User.password);
        if(passwordCorrect){
            res.status(201).json({
                id: User._id,
                name: User.name,
                email: User.email,
                token: generateToken(User._id)
            });
        } else {
            res.status(400).json({error: "Password is wrong"})
        }
    } else {
        res.status(400).json({error: "There is no such user"})
    }
}

// @desc    Add Product to Favourite
// @route   Get /api/user/:id/add-favourite
// @access  Private
const addToFavourites = async (req, res) => {
    const Product = await req.params.id;
    const User = req.user;

    User.favouriteProducts

    console.log(Product)
    console.log(User)

}


module.exports = {createUser, loginUser, addToFavourites}
const ProductModel = require('../models/productModel');
const asyncHandler = require("express-async-handler");



// @desc    Add Products
// @route   POST /api/product/add-product
// @access  Private
const addProduct = async (req, res) => {
    const {owner, name, price, currency, quantity, description, imageURL, category, brand} = req.body
   
    // Check if all required fields are filled
    if(!name) return res.status(400).json({error: "Please enter a product name"});
    if(!price) return res.status(400).json({error: "Please enter a product price"});
    if(!currency) return res.status(400).json({error: "Please enter a price currency"});

    // Check if price and quantity is a number
    if(isNaN(price)) return res.status(400).json({error: "Please enter a valid price"});
    if(isNaN(quantity)) return res.status(400).json({error: "Please enter a valid quantity"});

    let Product = await ProductModel.create({
        owner: owner,
        name: name,
        price: price,
        currency: currency,
        quantity: quantity,
        description: description,
        imageURL: imageURL,
        category: category,
        brand: brand,
    })

    if(Product){
        res.status(200).json({msg: "Product added successfully", product: Product})
    } else {
        res.status(400).json({message: "Product controller undefined error. Contact admin."});
    }
}

// @desc    Get All Product
// @route   GET /api/product/all
// @access  Private
const showProducts = async(req, res) => {
    const Products = await ProductModel.find({});

    if(Products){
        res.status(200).json(Products);
    } else{
        res.status(400).json({message: "Product controller undefined error. Contact admin."});
    }
}

// @desc    Get Product
// @route   GET /api/product/:id
// @access  Private
const showProduct = async(req, res) => {
        const Product = await ProductModel.findOne({_id: req.params.id});
        if(!Product) return res.status(400).json({error: "There is no such product"});
        if(Product) return res.status(200).json(Product);
}

// @desc    Update Product
// @route   GET /api/product/:id
// @access  Private
const updateProduct = async(req, res) => {
    try {
        const {owner, name, price, currency, quantity, description, imageURL, category, brand} = req.body
        const User = req.user;
        const Product = await ProductModel.findOne({_id: req.params.id});

        // Check if user is the owner of the product
        const isOwner = await Product.owner.includes(User._id);
        if(User._id && !isOwner) return res.status(400).json({error: "You are not the owner of this product"});

        // Check if added onwer is not already in the array
        const isAlreadyOwner = await Product.owner.includes(owner);
        if(owner && isAlreadyOwner) return res.status(400).json({error: "This user is already the owner of this product"});

        // Update product
        Product.name = name || Product.name;
        Product.owner = owner ? [...Product.owner, owner] : [...Product.owner];
        Product.price = price || Product.price;
        Product.currency = currency || Product.currency;
        Product.quantity = quantity || Product.quantity;
        Product.description = description || Product.description;
        Product.imageURL = imageURL || Product.imageURL;
        Product.category = category || Product.category;
        Product.brand = brand || Product.brand;

        await Product.save();

        if(Product) return res.status(200).json(Product);

    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "There is no such product"})
    }
}

// @desc    Update Product
// @route   GET /api/product/:id
// @access  Private
const deleteProduct = async(req, res) => {
    const User = req.user;
    const Product = await ProductModel.findOne({_id: req.params.id});

    // Delete Product
    if(Product){
         // Check if user is the owner of the product
        const isOwner = await Product.owner.includes(User._id);
        if(User._id && !isOwner) return res.status(400).json({error: "You are not the owner of this product"});
        
        await Product.deleteOne({_id: req.params.id});
        res.status(200).json({msg:"Product deleted successfully"});
    } else {
        res.status(400).json({message: "There is no such product"});
    }

}


module.exports = {addProduct, showProducts, showProduct, updateProduct, deleteProduct}
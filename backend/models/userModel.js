const ProductModel = require('./productModel')
const MongoDB = require('mongoose');

const userShema = MongoDB.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    userType:{
        type: String,
        default: "Customer",
    },
    favouriteProducts: [
        {
            type: MongoDB.Schema.Types.ObjectId, 
            ref: "Product"
        }
    ],

},{
    timesptamps: true,
    methods: {
        showAllFavouriteProducts: async function(){
            this.favouriteProducts.forEach(async product => {
                let productId = product._id.toHexString();
                let prod = await ProductModel.findById(productId)
                console.log(prod)
            })
        }
    },
})


module.exports = MongoDB.model("User", userShema)
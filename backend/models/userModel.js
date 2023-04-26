const { isAsyncFunction } = require('util/types');
const productModel = require('./productModel')

const MongoDB = require('mongoose');
const { options } = require('../routes/userRoutes');

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
    methods: {
        showAllFavouriteProducts: async function(){
            this.favouriteProducts.forEach(async product => {
                let productId = product._id.toHexString();
                let prod = await productModel.findById(productId)
                console.log(prod)
            })
        }
    }

})


module.exports = MongoDB.model("User", userShema)
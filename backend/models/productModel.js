const MongoDB = require('mongoose');

const productShema = MongoDB.Schema({
    name: {
        type: String,
        required: [true, "Please enter your product name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter your product price"],
    }
})

module.exports = MongoDB.model("Product", productShema)
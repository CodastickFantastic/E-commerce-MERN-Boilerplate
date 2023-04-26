const MongoDB = require('mongoose');

const reviewShema = MongoDB.Schema({
    reviewer: {
        type: MongoDB.Schema.Types.ObjectId,
        ref: "User"
    },
    evaluated_product: {
        type: MongoDB.Schema.Types.ObjectId,
        ref: "Product"
    },
    title: {
        type: String,
        required: [true, "Please enter your review title"],
    },
    message: {
        type: String,
        required: [true, "Please enter your review message"],
    },
    rating: {
        type: Number,
    },
    
    
})

module.exports = MongoDB.model("Review", reviewShema)
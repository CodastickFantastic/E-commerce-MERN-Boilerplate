const MongoDB = require('mongoose');

const productShema = MongoDB.Schema({
    name: {
        type: String,
        required: [true, "Please enter your product name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter your product price"],
    },
    quantity: {
        type: Number,
    },
    description: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    rating: {
        type: Number,
    },
    numReviews: {
        type: Number,
    },
    reviews: [
        {
            type: MongoDB.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    likedBy: [
        {
            type: MongoDB.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = MongoDB.model("Product", productShema)
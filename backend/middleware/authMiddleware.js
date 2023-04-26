const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authoriztaion && req.headers.authoriztaion.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authoriztaion.split(" ")[1];

            // Verify token
            const decoded = JWT.verify(token, process.env.JWT_SECRET);

            // Get user from token and compare with DB
            req.user = await UserModel.findById(decoded.id).select("-password");
            
            next();
        }
    }

}

module.exports = protect;
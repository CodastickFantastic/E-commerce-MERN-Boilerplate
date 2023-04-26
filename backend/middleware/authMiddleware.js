const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = JWT.verify(token, process.env.JWT_SECRET);

            // Get user from token and compare with DB
            req.user = await UserModel.findById(decoded.id).select("-password");
            next()
        } catch(err){
            console.error(err);
            res.status(401).json({error: "Not authorized, token failed"});
        }
    }

    if(!token){
        res.status(401).json({error: "Not authorized, no token"})
    }
    

};

module.exports = protect;
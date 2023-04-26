const MongoDB = require("mongoose")

const connectDB = async () => {
    try {
        const connection = await MongoDB.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to host: ${connection.connection.host}`.cyan.underline)
    } catch(error){
        console.log("MongoDB connection failed".red.bold)
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
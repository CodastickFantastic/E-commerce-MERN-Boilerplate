const errorHandler = (err, req, res, next) => {
    if (res.headersSent){
        return next(err)
    }

    console.log("Error Handler Middleware".red.bgBlack)
    console.log(err.message)
    console.log(err)

    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
    })
    
    // res.render("error", {error: err}) // Default Option
}


module.exports = {errorHandler}
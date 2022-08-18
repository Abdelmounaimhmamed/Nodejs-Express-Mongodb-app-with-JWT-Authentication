const errorHandler = (err , req, res, next) => {
    const StatusCode = res.StatusCode ? res.StatusCode : 500 
    res.status(StatusCode)
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack 
    })
}

module.exports = {errorHandler} ;
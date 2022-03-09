const createHttpError= require("http-errors");

const checkAuth = (req, res, next) => {
    if(!req.session.authenticated) {
        return next(createHttpError(401))
    } else {
        next()
    }
}

module.exports = {
    checkAuth
}
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler ( async (req,res,next) => {
    const { token } = req.cookies;


    // .if no token is present return unauthorized access error
    if (!token) {
        return next(new ErrorHandler(" Please Login to Access / Not an Authorized User ", 401))
    }

    //  verify token and check if error occurred or not
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //  if token is verified return user
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // if not have the permissions to access
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}
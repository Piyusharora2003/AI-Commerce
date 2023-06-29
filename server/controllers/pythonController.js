const { processPython } = require('../JsPythonConnector');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Functions in python is written in python source folder , and an array of parameters is passed 
exports.testcontroller = asyncErrorHandler(async (req, res, next) => {
    const {userImage,currentImage} = req.body;
    let response;
    response =await processPython("./python_source/test.py", [userImage, currentImage]);
    res.status(200).json({
        success: true,
        verified: response.isverified,
    });
});
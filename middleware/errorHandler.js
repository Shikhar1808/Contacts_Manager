//Creating a custom middleware for error handling
const { constants } = require("./../utils/constants");
exports.errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode? res.statusCode: 500;
    //agr status code diya hoga to vo jayega vrna 500 use karenge
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbinden",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No Error, All Good");
            break;
            
    }
}
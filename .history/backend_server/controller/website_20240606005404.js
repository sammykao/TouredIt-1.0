const errorHandlingMiddleware = (err, req, res, next) => {
    // logging error (TO SERVERSIDE)
    console.error(err);

    res.status(err.statusCode || 500);

    // preventing error leak to unauthorized users
    res.json({
        message: err.isPublic ? err.message : 'An unexpected error occurred'
    });
};

module.exports = errorHandlingMiddleware;
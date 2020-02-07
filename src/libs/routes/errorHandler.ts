export const errorHandlerMiddleware = ( error, req, res, next ) => {
    res.send({
        error: error.error,
        message: error.message || 'not found',
        status: error.status || 404,
        timestamp: new Date(),
    });
};

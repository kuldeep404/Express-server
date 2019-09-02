export const errorHandlerMiddleware = ( error, req, res, next ) => {
    res.send({
        error: error.error,
        message: error.message,
        status: error.status,
        timestamp: new Date(),
    });
};

export const errorHandlerMiddleware = ( error, req, res, next ) => {
    res.send({
        // error: 'Not Found',
        message: error,
        // status: '400',
        timestamp: new Date(),
    });
};

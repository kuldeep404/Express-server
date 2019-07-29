export const middeleWare2 = ( error, req, res, next ) => {
    console.log('Inside Middelware2 ');
    res.send({
        error: 'Not Found',
        message: error,
        status: 500,
        timestamp: new Date(),
    });
};

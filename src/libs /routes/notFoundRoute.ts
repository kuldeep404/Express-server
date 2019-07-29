export const middleWare1 = ( req, res, next) => {
    console.log('inside middleware 1');
    next('Not Found');
};

export const notFoundRouteMiddleware = ( req, res, next) => {
    next('Not Found');
};

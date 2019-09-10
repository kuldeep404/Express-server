import { isObject } from 'util';

const validationHandler = (config) => (req, res, next) => {
    const err = [];
    for (const key in config) {
        const dataPlace = config[key].in;
        const input = req[dataPlace][key];
        for (const keyProperty in config[key]) {
            switch (keyProperty) {
                case 'required':
                    if ((key in req[dataPlace]) && input !== null ) {
                        break;
                    }
                    else if (config[key][keyProperty] === false) {
                        dataPlace.forEach((inKey) => {
                            req[inKey][key] = config[key].default;
                        });
                    }

                    else {
                        err.push(`${key} is required`);
                    }

                    break;
                case 'string':
                    const value = req[dataPlace][key];
                    if (typeof value !== 'string' && value !== '') {
                        next({
                            error: 'Wrong input ',
                            message: `${key} should be string only`,
                            status: 422,
                        });
                    }
                    break;
                case 'regex':
                    const regexs = new RegExp(config[key][keyProperty]);
                    if (!regexs.test(req[dataPlace][key])) {
                        next({
                            error: 'Wrong type',
                            message: `${key} is not correct`,
                            status: 422,
                        });
                    }
                    break;
                case 'number':
                    const check = req[dataPlace][key];
                    if (isNaN(Number(check))) {
                        next({
                            error: config[key].errorMessage,
                            message: `${key} value must be number`,
                            status: 422,
                        });
                    }
                    break;
                case 'isObject':
                    const object = req[dataPlace][key];
                    if (!isObject(object) || Object.entries(object).length === 0) {
                        err.push(`${key} is required`);
                        break;
                    }
                    break;
                case 'custom':
                    config[key].custom(req[dataPlace][key]);
                    break;
                default:
                    break;
            }
            if ( err.length !== 0) {
                break ;
            }
        }
    }
    // console.log(err.length)
    if (err.length !== 0 ) {
        return next({
                error: 'Bad request ',
                message: err,
                status: 422,
        });
    }
    next();
};
export default validationHandler;

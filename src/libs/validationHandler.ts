import { isObject } from 'util';
const validationHandler = (config) => (req, res, next) => {
    for (const key in config) {
        if (true) {
            const dataPlace = config[key].in[0];
            for (const keyProperty in config[key]) {
                if (true) {
                    switch (keyProperty) {
                        case 'required':
                        console.log('in required', req.body);
                        if ((key in req[dataPlace]) && req[dataPlace][key] !== undefined) {
                            break;
                        }
                        else if (config[key][keyProperty] === false) {
                            dataPlace.forEach((inKey) => {
                                console.log('inkey', inKey);
                                req[inKey][key] = config[key].default;
                            });
                        } else {
                            next({
                            error: 'Wrong type gg',
                            message: `${key} is required`,
                            status: 400,
                            });
                        }
                        break;
                        case 'string':
                        const value = req[dataPlace][key];
                        if (typeof value === 'string' && value !== '') {
                            console.log('Yes it is String');
                        } else {
                            console.log('No it is not string');
                            next({
                                error: 'Wrong type',
                                message: `${key} should be string only`,
                                status: 400,
                            });
                        }
                        break;
                        case 'regex':
                        const regexs = new RegExp(config[key][keyProperty]);
                        if (regexs.test(req[dataPlace][key])) {
                            console.log(`${key} is correct`);
                        } else {
                            next({
                            error: 'Wrong type',
                            message: `${key} is not correct`,
                            status: 400,
                            });
                            console.log(`Error in ${key}`);
                        }
                        break;
                        case 'number':
                        const check = req[dataPlace][key];
                        if (!isNaN(Number(check))) {
                            console.log('It is number');
                        } else {
                            console.log('It is not number');
                            next({
                            error: config[key].errorMessage,
                            message: `${key} value must be number`,
                            status: 400,
                            });
                        }
                        break;
                        case 'isObject':
                        console.log('in isObject');
                        if (isObject(req[dataPlace][key])) {
                            console.log(`${key} is Object`);
                        } else {
                            console.log(`${key} must be an object`);
                            next({
                            error: 'Wrong Input',
                            message: `${key} should be Object only`,
                            status: 404,
                            });
                        }
                        break;
                        case 'custom':
                        console.log('In custom');
                        config[key].custom(req[dataPlace][key]);
                        break;
                        default:
                        console.log('Some error');
                        break;
                    }
                }
                }
            next();
        }
    }
};
export default validationHandler;

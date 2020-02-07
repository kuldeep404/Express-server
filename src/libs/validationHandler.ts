import { isObject } from 'util';

const validationHandler = (config) => (req, res, next) => {
    const err = [];
    let flag = false;
    for (const key in config) {
        flag = false;
        const dataPlace = config[key].in;
        const input = req[dataPlace][key];
        for (const keyProperty in config[key]) {
            switch (keyProperty) {
                case 'required':
                    if ((key in req[dataPlace]) && input !== null  ) {
                        break;
                    }
                    else if (config[key][keyProperty] === false) {
                        dataPlace.forEach((inKey) => {
                            req[inKey][key] = config[key].default;
                        });
                    }

                    else {
                        err.push(`${key} is required`);
                        flag = true;
                    }

                    break;
                case 'string':
                    const value = req[dataPlace][key];
                    if (typeof value !== 'string' && value !== null) {
                        err.push(`${key} should be string only`);
                        flag = true;
                    }
                    break;
                case 'regex':
                    const regexs = new RegExp(config[key][keyProperty]);
                    if (!regexs.test(req[dataPlace][key])) {
                        err.push(`${key} is not correct`);
                        flag = true;
                    }
                    break;
                case 'number':
                    const check = req[dataPlace][key];
                    if (isNaN(Number(check))) {
                        err.push(`${key} value must be number`);
                        flag = true;
                    }
                    break;
                case 'isObject':
                    const object = req[dataPlace][key];
                    if (!isObject(object) || Object.entries(object).length === 0) {
                        err.push(`${key} is required`);
                        flag = true;
                        break;
                    }
                    break;
                case 'custom':
                    const result = config[key].custom(req[dataPlace][key]);
                    if (result) {
                        err.push(result);
                        flag = true;
                    }
                    break;
                default:
                    break;
            }
            // console.log('------>', err.length);
            if (err.length !== 0 && flag === true) {
                break ;
            }
        }
    }
    // console.log(err.length)
    if (err.length !== 0  ) {
        return next({
                error: 'Bad request ',
                message: err,
                status: 422,
        });
    }
    next();
};
export default validationHandler;

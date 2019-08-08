import { isObject } from 'util';
const body = ['body'];
const id =  ['id'];
const name = ['name'];
const validationHandler = (config) => (req, res, next) => {
    if (req.method === 'POST') {
        for (const key in config) {
        if (true) {
            console.log('Inside Post');
            if (key in req.body && key === 'id') {
                if (typeof req.body.id === 'string') {
                    // console.log('Yes ID is string');
                } else {
                    // console.log('No ID is not string');
                    next(`${key} is required`);
                }
            } else if (key in req.body && key === 'name') {
                const regexs = new RegExp(config.name.regexs);
                if (regexs.test(req.body.name)) {
                    // console.log('Name is corrrect');
                } else {
                    next(`${key} ,is required`);
                    // console.log('Error in name');
                }
            } else {
                // console.log('Error');
                next(`${key} ,is required`);
            }
        }
    }
}

    if (req.method === 'DELETE') {
        console.log('In Delete method');
        const key = Object.keys(req.query)[0];
        const keyCheck = new RegExp('^[0-9]*$');
        if (keyCheck.test(key)) {
            // console.log('Key is deleted');
        } else {
            // console.log('you need to pass key in parameters');
            next(`${key} ,is required`);
        }
    }

    if (req.method === 'GET') {
        console.log('In GET method');
        if (req.query === null) {
        console.log('inside get');
        } else {
            for (const key in config) {
                if (true) {
                if (key === 'skip') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req.query[keyName];
                    const keyCheck = new RegExp('^[0-9]*$');
                    if (keyCheck.test(check)) {
                        // console.log('It is number');
                    } else {
                        // console.log('It is not number');
                        next(`${key} ,is invalid`);
                    }
                }
                if (key === 'limit') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req.query[keyName];
                    const keyCheck = new RegExp('^[0-9]*$');
                    if (keyCheck.test(check)) {
                        // console.log('It is number');
                    } else {
                        // console.log('It is not number');
                        next(`${key} ,is invalid`);
                    }
                }
                }
            }
        }
    }

    if (req.method === 'PUT') {
        console.log('In PUT method');
        for (const key in config) {
            if (key in req.body && key === 'id') {
                if (typeof req.body.id === 'string') {
                    // console.log('Yes ID is string');
                } else {
                    // console.log('No ID is not string');
                    next(`${key} ,is required`);
                }
            } else if (key in req.body && key === 'dataToUpdate') {
                // console.log('key is dataToupdate');
                // req['body']['dataToUpdate']
                if (isObject(req.body.dataToUpdate)) {
                    // console.log("yes dataToUpdate is Object");
                } else {
                    next('data should be object only');
                }
            } else {
                next(`${key} ,is required`);
            }
        }
    }
    // console.log('Inside validationHandler');
    next();
};
export default validationHandler;

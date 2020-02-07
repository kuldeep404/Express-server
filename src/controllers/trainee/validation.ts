const  validation = {
    create: {
        name: {
            required: true,
            custom: (password) => {
                if (!password) {
                    return ('name cannot be empty');
                }
            },
            errorMessage: 'Name is required',
            in: ['body'],
            regex: '^[a-z A-Z_0-9]+$',
        },
        email: {
            required: true,
            custom: (password) => {
                if (!password) {
                    return ('email cannot be empty');
                }
            },
            in: [ 'body' ],
            regex: '^[^.+-_][a-zA-Z0-9._]+@successive.tech$',
            string: true,
        },
        password: {
            required: true,
            custom: (password) => {
                if (!password) {
                    return ('password cannot be empty');
                }
            },
            errorMessage: 'Password is required',
            in: ['body'],
        },
    },
    delete: {
        id: {
            errorMessage: 'Id is required',
            in: ['params'],
            required: true,
        },
    },
    get: {
        limit: {
            required: false,
            number: true,
            default: 10,
            errorMessage: 'Limit is invalid',
            in: ['query'],
        },
        skip: {
            required: false,
            number: true,
            default: 0,
            errorMessage: 'Skip is invalid',
            in: ['query'],
        },
    },
    update: {
        dataToUpdate: {
            required: true,
            in: ['body'],
            isObject: true,
            custom: (dataToUpdate, next, res) => {
                const regex = /^[a-z A-Z]+$/;
                const regexEmail = /^[^.+-_][a-zA-Z0-9._]+@successive.tech$/;
                if ('name' in dataToUpdate &&  !regex.test(dataToUpdate.name) ) {
                    throw({
                        error: 'Invalid input',
                        message: 'name incorrect',
                        status: 422,
                    });
                }
                if ('password' in dataToUpdate && !dataToUpdate.password) {
                    console.log('hello', dataToUpdate.password);
                    throw({
                        error: 'Invalid input',
                        message: 'password incorrect',
                        status: 422,
                    });
                }
                if ('email' in dataToUpdate && !regexEmail.test(dataToUpdate.email)) {
                    throw({
                        error: 'Invalid input',
                        message: 'email incorrect',
                        status: 422,
                    });
                }
            },
            id: {
                in: ['body'],
                required: true,
                string: true,
            },
        },
        id: {
            in: ['body'],
            required: true,
            string: true,
        },
    },
};
export default validation;

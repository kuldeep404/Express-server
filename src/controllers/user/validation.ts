const  validation = {
    create: {
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
            // custom: (password) => {
            //     if (!password) {
            //         throw({
            //             error: 'Invalid input',
            //             message: 'password cannot  be empty',
            //             status: 422,
            //         });
            //     }
            // },
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
            in: ['query'],
            number: true,
            default: 10,
            errorMessage: 'Limit is invalid',
        },
        skip: {
            required: false,
            in: ['query'],
            number: true,
            default: 0,
            errorMessage: 'Skip is invalid',
        },
    },
    update: {
        dataToUpdate: {
            custom: ((dataToUpdate ) => {
                return true ;
            }),
            in: ['body'],
            isObject: true,
            required: true,
        },
        id: {
            in: ['body'],
            required: true,
            string: true,
        },
    },
};
export default validation;

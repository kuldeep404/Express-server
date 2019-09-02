const  validation = {
    create: {
        password: {
            required: true,
            errorMessage: 'Password is required',
            in: ['body'],
        },
        email: {
            required: true,
            in: [ 'body' ],
            string: true,
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

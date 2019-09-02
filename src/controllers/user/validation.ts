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
            custom: ((value) => {
                console.log('Value', value);
            }),
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
            default: 10,
            errorMessage: 'Limit is invalid',
            in: ['query'],
            number: true,
            required: false,
        },
        skip: {
            default: 0,
            errorMessage: 'Skip is invalid',
            in: ['query'],
            number: true,
            required: false,
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

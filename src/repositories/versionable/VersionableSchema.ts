import * as mongoose from 'mongoose';
export default class VersionableSchema extends mongoose.Schema {
    constructor(options: any, collections: any) {
        const versionedOptions = Object.assign({
            createdAt: {
                default: Date.now,
                required: true,
                type: Date,
            },
            createdBy: {
                required: true,
                type: String,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            deletedBy: {
                optional: false,
                type: String,

            },
            originalId: {
                required: true,
                type: String,
            },
            updatedAt: {
                default: Date.now,
                required: true,
                type: String,
            },
                updatedBy: {
                required: true,
                type: String,
            },
        }, options);
        super(versionedOptions, collections);
    }
}

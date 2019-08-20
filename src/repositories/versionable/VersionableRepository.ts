import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';
// import { formatWithOptions } from "util";
import UserRepository from '../user/UserRepository';

export default class VersionableRepository < D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }
    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }
    public async create(options): Promise < D > {
        const id = VersionableRepository.generateObjectId();
        const model = new this.modelType({
            ...options,
            _id: id,
            createdBy: options.userId,
            originalId: id,
            updatedBy: options.userId,
        });
        return model.save().then((record) => record.toObject());
    }
    public async update(id, options) {
        try {
            let originalData;
            const userRepository = new UserRepository();
            const updateUser = await userRepository.findOne({ originalId: id, deletedAt: {$exists: false} });
            if (!updateUser) {
                throw 'not found';
            }
            else {
                originalData = updateUser;
                const id = VersionableRepository.generateObjectId();
                const modelCreate = new this.modelType({
                    ...originalData,
                    ...options,
                    _id: id,
                });
                const record = await this.modelType.create(modelCreate);
                await record.toObject();
                const newestId = originalData.id;
                const modelUpdate = new this.modelType({
                    ...originalData,
                    deletedAt: Date.now(),
                });
                return this.modelType.updateOne({ _id: newestId }, modelUpdate);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    public async delete(id) {
        try {
            let originalData;
            const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
            if (!findDelete) {
                throw 'not found in delete';
            }
            else {
                originalData = findDelete;
                const newId = originalData._id;
                const modelDelete = new this.modelType({
                    ...originalData,
                    deletedAt: Date.now(),
                });
                return this.modelType.updateOne({ _id: newId }, modelDelete);
            }
        } catch (error) {
            console.error(error);
        }

    }
    public get(query, projection) {
        return this.modelType.findOne(query, projection).lean();
    }
    public getAll(query, projection, options) {
        return this.modelType.find(query, undefined, options).populate(' password ').lean();
    }
}

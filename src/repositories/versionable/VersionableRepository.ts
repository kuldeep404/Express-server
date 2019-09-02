import * as mongoose from 'mongoose';

export default class VersionableRepository < D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }
    private modelType: M;
    constructor(modelType) {
        this.modelType = modelType;
    }
    public async create(options): Promise < D > {
        try {
            const id = VersionableRepository.generateObjectId();
            const model = new this.modelType({
                ...options,
                _id: id,
                createdBy: options.userId,
                originalId: id,
                updatedBy: options.userId,
            });
            return model.save().then((record) => record.toObject());
        } catch (err) {
            throw err;
        }
    }

    public async update(id, options) {
        try {
            const Update = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
            if (!Update) {
                throw 'not found ';
            } else {
                const id = VersionableRepository.generateObjectId();
                const modelCreate = new this.modelType({
                    ...Update,
                    ...options,
                    _id: id,
                });
                const result = await this.modelType.create(modelCreate);
                await result.toObject();
                const newId = Update._id;
                const modelUpdate = new this.modelType({
                    ...Update,
                    deletedAt: Date.now(),
                });
                return this.modelType.updateOne({ _id: newId }, modelUpdate);
            }
        } catch (err) {
            throw err;
        }

    }
    public async delete(id) {
        try {
            const Delete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
            if (!Delete) {
                throw 'not found ';
            }
            else {
                const newId = Delete._id;
                const modelDelete = new this.modelType({
                    ...Delete,
                    deletedAt: Date.now(),
                });
                return this.modelType.updateOne({ _id: newId }, modelDelete);
            }
        } catch (error) {
            throw error;
        }

    }
    public get(query, projection) {
        return this.modelType.findOne(query, projection).lean();
    }
    public getAll(query, projection, options) {
        return this.modelType.find(query, undefined, options).populate(' password ').lean();
    }
}

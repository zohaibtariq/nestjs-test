import { Document, FilterQuery, Model, ObjectId, UpdateQuery } from "mongoose";

export abstract class EntityRepository<T extends Document> {

    protected constructor(protected readonly entityModel: Model<T>) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection: Record<string, unknown> = {}
    ): Promise<T | null>{
        return this.entityModel.findOne(entityFilterQuery, {
            __v: 0,
            ...projection
        }).exec()
    }

    async find(
        entityFilterQuery: FilterQuery<T>,
        projection: Record<string, unknown> = {}
    ): Promise<T[] | null>{
        return this.entityModel.find(entityFilterQuery, {
            __v: 0,
            ...projection
        })
    }

    async findById(
        _id: ObjectId,
        projection: Record<string, unknown> = {}
    ): Promise<T[] | null>{
        return this.entityModel.findById(_id, {
            __v: 0,
            ...projection
        })
    }

    async create(
        createEntityData: unknown
    ): Promise<T> {
        return this.entityModel.create(createEntityData)
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
        options: Record<string, unknown> = {}
    ): Promise<T|null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, options)
    }

    async findByIdAndUpdate(
        id: ObjectId,
        updateEntityData: UpdateQuery<unknown>,
        options: Record<string, unknown> = {}
    ): Promise<T|null> {
        return this.entityModel.findByIdAndUpdate(id, updateEntityData, options)
    }

    async deleteMany(
        entityFilterQuery: FilterQuery<T>
    ): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery)
        return deleteResult.deletedCount >= 1
    }

    async findByIdAndRemove(
        id: ObjectId,
    ): Promise<boolean> {
        return this.entityModel.findByIdAndRemove(id);
    }

    async insertMany(
        data: unknown
    ): Promise<Array<T>> {
        return this.entityModel.insertMany(data)
    }

}
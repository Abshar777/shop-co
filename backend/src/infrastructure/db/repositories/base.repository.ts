import { FilterQuery, Model, UpdateQuery } from "mongoose";


export class BaseRepository<T> {
    public readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    async findByUserId(userId: string): Promise<T | null> {
        return this.model.findOne({userId});
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }


    async updateOne(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
        return this.model.findOneAndUpdate(filter, data, { new: true });
    }


    async updateMany(filter: FilterQuery<T>, data: Partial<T>) {
        return this.model.updateMany(filter, data);
    }


    async deleteById(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }


    async upsert(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null> {
        return this.model.findOneAndUpdate(filter, data, { new: true, upsert: true });
    }
 


    
    
}

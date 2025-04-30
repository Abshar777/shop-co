import { BaseRepository } from "./base.repository";
import { IUserDocument } from "../../../domain/interfaces/user.interface";
import UserModel from "../models/user.model";
import { Roles } from "../../../domain/types/user.type";



export class UserRepository extends BaseRepository<IUserDocument> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return await this.model.findOne({ email });
    }

    async getUsersByRole(role: Roles): Promise<IUserDocument[]> {
        return await this.model.find({ role });
    }
}

export default new UserRepository();

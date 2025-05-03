import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { Schema } from "mongoose";
import { Roles } from "../../../domain/types/user.type";
import {  IUserDocument } from "../../../domain/interfaces/user.interface";
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: [Roles.ADMIN, Roles.CLIENT, Roles.DELIVERY_BOY], default: Roles.CLIENT, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
}, { timestamps: true });



UserSchema.pre<IUserDocument>("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});



UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model<IUserDocument>('User', UserSchema);
export default User;

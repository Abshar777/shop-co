import { config } from "dotenv";
import { Roles } from "../../domain/types/user.type";
import { UserRepository } from "../../infrastructure/db/repositories/user.repository";
config();


export const initAdmin = async () => {
    const userRepository = new UserRepository();
    let user = await userRepository.findByEmail(process.env.ADMIN_EMAIL as string);
    if (!user) {
        user = await userRepository.create({ email: process.env.ADMIN_EMAIL as string, password: process.env.ADMIN_PASSWORD as string, role: Roles.ADMIN, name: "Admin", verified: true });
    }
    console.log("🎉 Admin created successfully");
}



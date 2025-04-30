import { IUser, IUserDocument } from "../../../domain/interfaces/user.interface";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
import { Roles } from "../../../domain/types/user.type";
import JwtService from "../../../shared/utils/jwt";
import type IJwtService from "../../../domain/interfaces/jwt.ineterface";

export class UserUsecase {
    private readonly userRepository: UserRepository;
    private readonly jwtService: IJwtService;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
    }

    async loginUser(email: string, password: string): Promise<{ user: IUserDocument, accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.comparePassword(password)) {
            throw new Error("Invalid password");
        }
        const accessToken = this.jwtService.generateAccessToken({ userId: user._id });
        const refreshToken = this.jwtService.generateRefreshToken({ userId: user._id });
        return { user, accessToken, refreshToken };
    }

    async registerUser(user: Partial<IUser>): Promise<{ user: IUserDocument, accessToken: string, refreshToken: string }> {

        if (!user.email || !user.password || !user.name) {
            throw new Error("Email, password and name are required");
        }
        const existingUser = await this.userRepository.findByEmail(user.email as string);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = await this.userRepository.create(user);
        const accessToken = this.jwtService.generateAccessToken({ userId: newUser._id });
        const refreshToken = this.jwtService.generateRefreshToken({ userId: newUser._id });
        return { user: newUser, accessToken, refreshToken };
    }

    async getUsersByRole(role: Roles): Promise<IUserDocument[]> {
        return this.userRepository.getUsersByRole(role);
    }


}

export default new UserUsecase();

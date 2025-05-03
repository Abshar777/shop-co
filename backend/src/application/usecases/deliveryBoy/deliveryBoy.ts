import IJwtService from "../../../domain/interfaces/jwt.ineterface";
import { IUser, IUserDocument } from "../../../domain/interfaces/user.interface";
import { Roles } from "../../../domain/types/user.type";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
import JwtService from "../../../shared/utils/jwt";

export class DeliveryBoyUsecase {
    private readonly userRepository: UserRepository;
    private readonly jwtService: IJwtService;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
    }

    async getDeliveryBoys(): Promise<IUserDocument[]> {
        return this.userRepository.getUsersByRole(Roles.DELIVERY_BOY);
    }


    async loginDeliveryBoy(email: string, password: string): Promise<{ user: IUserDocument, accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Your email is not registered");
        }
        if (!user.comparePassword(password)) {
            throw new Error("Invalid password");
        }
        if (user.role !== Roles.DELIVERY_BOY) {
            throw new Error("You are not a delivery boy");
        }
        if (!user.verified) {
            throw new Error("Your account is not verified by Admin");
        }
        const accessToken = this.jwtService.generateAccessToken({ userId: user._id });
        const refreshToken = this.jwtService.generateRefreshToken({ userId: user._id });

        return { user, accessToken, refreshToken };
    }

    async registerDeliveryBoy(user: Partial<IUser>): Promise<{ user: IUserDocument, accessToken: string, refreshToken: string }> {

        if (!user.email || !user.password || !user.name) {
            throw new Error("Email, password and name are required");
        }
        const existingUser = await this.userRepository.findByEmail(user.email as string);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = await this.userRepository.create({ ...user, role: Roles.DELIVERY_BOY });
        const accessToken = this.jwtService.generateAccessToken({ userId: newUser._id });
        const refreshToken = this.jwtService.generateRefreshToken({ userId: newUser._id });
        return { user: newUser, accessToken, refreshToken };
    }
}

import IJwtService from "../../../domain/interfaces/jwt.ineterface";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
import { IUserDocument } from "../../../domain/interfaces/user.interface";
import JwtService from "../../../shared/utils/jwt";
import { Roles } from "../../../domain/types/user.type";
import { OrderRepository } from "../../../infrastructure/db/repositories/order.repository";
import { IOrderDocument } from "../../../domain/interfaces/order.interface";
import { NotificationRepository } from "../../../infrastructure/db/repositories/notification.repository";
import { NotificationUsecase } from "../notification/notification.usecase";
export class AdminUsecase {
    private readonly userRepository: UserRepository;
    private readonly jwtService: IJwtService;
    private readonly orderRepository: OrderRepository;
    private readonly notificationRepository: NotificationRepository;
    private readonly notificationUsecase: NotificationUsecase
    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
        this.orderRepository = new OrderRepository();
        this.notificationRepository = new NotificationRepository();
        this.notificationUsecase = new NotificationUsecase();
    }

    async getUsersByRole(role: Roles): Promise<IUserDocument[]> {
        return await this.userRepository.getUsersByRole(role);
    }

    async verifyUser(userId: string, status: boolean): Promise<IUserDocument | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.verified = status;
        // WIREUP: socket io to send notification to the user
        await this.notificationUsecase.createNotification({
            userId: user._id as string,
            title: "User Verified",
            message: "Your account has been verified",
            type: "VERIFICATION",
            read: false
        })
        return await this.userRepository.updateById(userId, user);
    }

    async adminLogin(email: string, password: string): Promise<{ user: IUserDocument, accessToken: string, refreshToken: string }> {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (email !== adminEmail || password !== adminPassword) {
            throw new Error("Invalid email or password");
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = this.jwtService.generateAccessToken({ userId: user._id });
        const refreshToken = this.jwtService.generateRefreshToken({ userId: user._id });
        return { user, accessToken, refreshToken };
    }

    async getOrders(): Promise<IOrderDocument[]> {
        return await this.orderRepository.getOrders();
    }

    async getOrdersByDeliveryBoy(deliveryBoyId: string): Promise<IOrderDocument[]> {
        return await this.orderRepository.getOderByDeliveryBoy(deliveryBoyId);
    }



}

export default new AdminUsecase();

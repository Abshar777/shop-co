import { Request, Response, NextFunction } from "express";
import { UserUsecase } from "../../application/usecases/user/user.usecase";
import { statusCodes } from "../../shared/constants/api.constant";


/**  @Controller */
export class AuthController {
    /**
     * @description User usecase
     */
    private readonly authUsecase: UserUsecase

    constructor() {
        this.authUsecase = new UserUsecase();
    }


    /**
     * @description Login user
     * @Method POST
     * @Route /api/auth/login
     * @Body email: string, password: string
     * @Response 200 - User logged in successfully
     * @Response 400 - Email and password are required
     * @Response 500 - Internal server error
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(statusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Email and password are required"
                });
            }
            const { user, accessToken, refreshToken } = await this.authUsecase.loginUser(email, password);
            res.status(statusCodes.OK).json({
                success: true,
                message: "User logged in successfully",
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }

    }



    /**
     * @description Register user
     * @Method POST
     * @Route /api/auth/register
     * @Body email: string, password: string, name: string
     * @Response 201 - User registered successfully
     * @Response 400 - Email, password and name are required
     * @Response 500 - Internal server error
     */
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name) {
                return res.status(statusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Email, password and name are required"
                });
            }
            const { user, accessToken, refreshToken } = await this.authUsecase.registerUser({ email, password, name });
            res.status(statusCodes.CREATED).json({
                success: true,
                message: "User registered successfully",
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();

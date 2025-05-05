import connectSocket from "../../config/socket.config";
import http from "http";
import { UserRepository } from "../db/repositories/user.repository";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Namespace, Server } from "socket.io";


const userSocketMap = new Map<string, string>()

export const socketIoSetup = async (io: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const userRepository = new UserRepository();

    // listen when client is connected to socket
    io.on("connection", async (socket) => {
        // const socketController = new SocketController(io);
        const userId = socket.handshake.query["userId"]

        console.log("🟡 user conneted to socket from id:", socket.id, userId);

        if (userId && userId !== null && !!userId) {
            try {
                const user = await userRepository.findById(userId as string);
                if (user) {
                    // socket.join(userId as string)
                    userSocketMap.set(userId as string, socket.id)
                    io.to(socket.id).emit("joined", {
                        message: `🔵 user:${user?.name} joined room `
                    })
                    console.log(`🟢 user data updated , ${user.name} is online`);
                } else {
                    userSocketMap.delete(userId as string)
                    console.log("🔴 user is not found");
                    socket.disconnect();
                }



            } catch (error) {
                console.log("🔴 error on while updateing user", (error as Error).message)

            }
        } else console.log("🔴 user id is not found ");

    });

}

export const getReceiverSocketId = (userId: string) => {
    const getd = userSocketMap.get(userId)
    console.log("🟡 getReceiverSocketId", getd, userSocketMap)
    return getd
}
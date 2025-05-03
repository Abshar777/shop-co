import { RedisService } from "./redis";
import { REDIS_CHANNELS } from "../../shared/constants/redis.constant";
import { Server } from "socket.io";
import { getReceiverSocketId } from "../socket/socketHandler";

export function handleRedisAndSocketMessage(redisService: RedisService, io: Server) {
    //   enum to array
    const channels = Object.values(REDIS_CHANNELS);
    channels.forEach(async (channel) => {
        await redisService.subscribe(channel);
    });

    redisService.on("message", (channel, message) => {
        switch (channel) {
            case REDIS_CHANNELS.NOTIFICATION:
                const data = JSON.parse(message);
                const socketId = getReceiverSocketId(data?.userId) || null;
                if (socketId) {
                    console.log("🟢 sending notification to user", data?.userId, socketId);
                    io.to(socketId).emit("notification", data);
                } else {
                    console.log("🔴 no socket id found for user", data?.userId);
                }
                break;
        }

    });
}


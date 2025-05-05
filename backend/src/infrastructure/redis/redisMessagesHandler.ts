import { RedisService } from "./redis";
import { REDIS_CHANNELS } from "../../shared/constants/redis.constant";
import { DefaultEventsMap, Namespace, Server } from "socket.io";
import { getReceiverSocketId } from "../socket/socketHandler";

export function handleRedisAndSocketMessageClient(redisService: RedisService, io: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    //   enum to array
    const channels = Object.values(REDIS_CHANNELS);
    channels.forEach(async (channel) => {
        await redisService.subscribe(channel);
    });

    redisService.on("message", async (channel, message) => {
        switch (channel) {
            case REDIS_CHANNELS.NOTIFICATION:
                const data = JSON.parse(message);
                const socketId = await getReceiverSocketId(data?.userId) || null;
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

export function handleRedisAndSocketMessageAdmin(redisService: RedisService, io: Namespace<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    //   enum to array
    const channels = Object.values(REDIS_CHANNELS);
    channels.forEach(async (channel) => {
        await redisService.subscribe(channel);
    });

    redisService.on("message", async (channel, message) => {
        switch (channel) {
            case REDIS_CHANNELS.ORDER_PLACED:
                console.log("🟢 order placed", message);
                io.emit("order_placed", message);
                break;
        }


    });
}


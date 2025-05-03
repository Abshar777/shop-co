import Redis from "ioredis";
import { config } from "dotenv";
config();


export const createRedisClient = (clientType: 'subscriber' | 'publisher' | 'standard' = 'standard') => {
    const client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || "6379"),
      
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
        }
    });

    client.on("error", (err) => {
        console.error(`Redis ${clientType} client error:`, err);
    });

    client.on("connect", () => {
        console.log(`Redis ${clientType} client connected 🎉`);
    });

    client.on("reconnecting", () => {
        console.log(`Redis ${clientType} client reconnecting...`);
    });

    return client;
};
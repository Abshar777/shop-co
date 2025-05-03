import { config } from "dotenv";
import Redis from "ioredis";
import { createRedisClient } from "../../config/redis.config";
import { REDIS_CHANNELS } from "../../shared/constants/redis.constant";
config();

const redis = createRedisClient();
const redisSubscriber = createRedisClient('subscriber');

export class RedisService {
    private redis: Redis | null;
    private redisSubscriber: Redis | null;
    constructor() {
        this.redis = redis;
        this.redisSubscriber = redisSubscriber;
    }

    connect() {
        this.redis = redis;
        
    }


    async set(key: string, value: string, ttl?: number) {
        if (!this.redis) {
            return;
        }
        if (ttl) {
            await this.redis.set(key, value, "EX", ttl);
        } else {
            await this.redis.set(key, value);
        }
    }

    async get(key: string) {
        if (!this.redis) {
            return;
        }
        return await this.redis.get(key);
    }

    async del(key: string) {
        if (!this.redis) {
            return;
        }
        await this.redis.del(key);
    }

    async publish(channel: string, message: string) {
        if (!this.redis) {
            return;
        }
        console.log("🔴 publish", channel, message);
        await this.redis?.publish(channel, message);
    }

    async subscribe(channel: REDIS_CHANNELS) {
        if (!this.redisSubscriber) {
            return;
        }
        await this.redisSubscriber.subscribe(channel, (err, count) => {
            if (err) {
                console.error('Failed to subscribe:', err);
                return;
            }
            console.log(`Subscribed to ${channel}. Now listening for messages...`);
        });
    }

    on(event: string, callback: (channel: string, message: string) => void) {
        if (!this.redisSubscriber) {
            return;
        }
        this.redisSubscriber.on(event, callback);
    }




}



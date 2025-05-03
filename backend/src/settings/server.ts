import app from './app';
import connectDB from '../config/db.config';
import { PORT } from '../shared/constants';
import { config } from 'dotenv';
import initProduct from '../shared/scripts/initProduct.script';
import { initAdmin } from '../shared/scripts/initAdmin';
import http from 'http';
import connectSocket from '../config/socket.config';
import { RedisService } from '../infrastructure/redis/redis';
import { REDIS_CHANNELS } from '../shared/constants/redis.constant';
import { handleRedisAndSocketMessage } from '../infrastructure/redis/redisMessagesHandler';
import { socketIoSetup } from '../infrastructure/socket/socketHandler';

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT Exception! Shutting down ...");
    console.error(err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down ...");
    console.error(err);
    process.exit(1);
});

const redisService = new RedisService();

async function main() {

    config();

    await connectDB();


    await initProduct();
    await initAdmin();
    redisService.connect();
    const server = http.createServer(app);
    const io = connectSocket(server);
    socketIoSetup(io)
    handleRedisAndSocketMessage(redisService, io);


    server.listen(PORT, () => {
        console.log(`🎉 Server running on port ${PORT}`);
    });
}


const shutdown = () => {
    console.log("Shutting down gracefully...");
    process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


main().catch((err) => {
    console.error("Failed to Load Server 🔴:", err);
    process.exit(1);
});
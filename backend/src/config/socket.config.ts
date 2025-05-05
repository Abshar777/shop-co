import { Server } from "socket.io"
import http from "http";
import { config } from "dotenv";
config()

const connectSocket = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    return new Server(server, {
        cors: {
            origin: [process.env.FRONTEND_URL!, process.env.ADMIN_URL!],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
        connectTimeout: 10000,
        pingTimeout: 5000,
        pingInterval: 10000
    })
}


export default connectSocket;


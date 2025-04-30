import app from './app';
import connectDB from '../config/db.config';
import { PORT } from '../shared/constants';
import { config } from 'dotenv';
import initProduct from '../shared/scripts/initProduct.script';

process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("UNCAUGHT Exception! Shutting down ...");
    process.exit(1);
});



async function main() {
    config();
    await connectDB();
    await initProduct();
}


main().then(() => {
    app.listen(PORT, () => console.log(`🎉 Server running on port ${PORT} `));
}).catch((err) => {
    console.error("Failed to Load Server 🔴:", err);
    process.exit(1);
});


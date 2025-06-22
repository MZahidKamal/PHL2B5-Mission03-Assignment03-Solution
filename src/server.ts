import {Server} from 'http';
import app from "./app";
import config from './config/index';
import * as mongoose from "mongoose";


let server: Server;


const bootstrap = async () => {
    try {

        // Connecting to MongoDB, using the Mongoose package.
        const database = await mongoose.connect(config.mongodb_uri as string);
        if (database) {
            console.log('✅ Connected to MongoDB successfully!');
        }

        // Starting the server to see the output in the browser.
        server = app.listen(config.port, () => {
            console.log(`✅ Library Management Server listening on port ${config.port}`);
        });

    } catch (error: any) {
        console.error('❌ Error in bootstrap: ', error.message);

        // Graceful shutdown.
        if (server) {
            console.log('⚠️ Server closed successfully!');
            server.close(() => process.exit(1));
        } else {
            console.log('⚠️ Server closed successfully!');
            process.exit(1);
        }
    }
}


bootstrap().then();

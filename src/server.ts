import {Server} from 'http';
import app from "./app";
import 'dotenv/config';
import * as mongoose from "mongoose";


const PORT = 5000;
let server: Server;


const bootstrap = async () => {
    try {

        // Connecting to MongoDB, using the Mongoose package. MongoDB URI is coming from the.env file.
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ktxyk.mongodb.net/Library_Management_API_DB-PHNLB5-M3A3?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to MongoDB using Mongoose!');

        // Running the server to see the output in the browser.
        server = app.listen(PORT, () => {
            console.log(`Library Management Server listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log('Error in bootstrap!');
        console.log(error);
        process.exit(1);
    }
}


bootstrap().then();

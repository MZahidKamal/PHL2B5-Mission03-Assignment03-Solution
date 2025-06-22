import dotenv from 'dotenv';
dotenv.config();

const config = {
    node_environment: process.env.NODE_ENVIRONMENT,
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
}

export default config;

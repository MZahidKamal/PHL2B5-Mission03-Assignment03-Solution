"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    node_environment: process.env.NODE_ENVIRONMENT,
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
};
exports.default = config;

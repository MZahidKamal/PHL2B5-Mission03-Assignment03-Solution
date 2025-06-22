"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("./app/controllers/books.controller"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Routes forwarding
app.use('/books', books_controller_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management Server, created using ExpressJS, Mongoose and TypeScript!');
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("./app/controllers/books.controller"));
const borrows_controller_1 = __importDefault(require("./app/controllers/borrows.controller"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes forwarding
app.use('/api/books', books_controller_1.default);
app.use('/api/borrow', borrows_controller_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management Server, created using ExpressJS, Mongoose and TypeScript!');
});
exports.default = app;

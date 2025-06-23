"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_model_1 = __importDefault(require("../models/books.model"));
const express_1 = __importDefault(require("express"));
const bookRoutes = express_1.default.Router();
bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBookObj = req.body;
        const newBook = yield books_model_1.default.create(newBookObj);
        res.status(201).json({
            success: true,
            message: 'New book created successfully!',
            data: newBook
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'New book creation failed!',
            success: false,
            error: error.errors
        });
    }
}));
bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { filter, sortBy, sort, limit } = req.query;
        let query = books_model_1.default.find();
        if (filter) {
            const formattedFilter = filter.toString().charAt(0).toUpperCase() + filter.toString().slice(1).toLowerCase();
            query = query.where('genre').equals(formattedFilter);
        }
        if (sortBy && sort) {
            query = query.sort({ [sortBy]: sort === 'desc' ? -1 : 1 });
        }
        if (limit) {
            query = query.limit(Number(limit));
        }
        const allBooks = yield query;
        res.status(200).json({
            success: true,
            message: 'Getting all books successful!',
            data: allBooks
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Getting all books failed!',
            success: false,
            error: error.errors || { message: error.message }
        });
    }
}));
exports.default = bookRoutes;

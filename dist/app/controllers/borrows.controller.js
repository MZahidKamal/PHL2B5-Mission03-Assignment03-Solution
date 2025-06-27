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
const borrows_model_1 = __importDefault(require("../models/borrows.model"));
const express_1 = __importDefault(require("express"));
const borrowRoutes = express_1.default.Router();
// CREATE
borrowRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBorrowObj = req.body;
        const newBorrow = yield borrows_model_1.default.create(newBorrowObj);
        res.status(201).json({
            success: true,
            message: 'New borrow entry created successfully!',
            data: newBorrow
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'New borrow entry creation failed!',
            success: false,
            error: error.errors || error.message
        });
    }
}));
// READ
borrowRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const desiredPipeline = [
            {
                $lookup: {
                    from: 'bookmodels', // The 'bookmodels' is created by MongoDB from the BookModel collection.
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookDocument'
                }
            },
            {
                $unwind: '$bookDocument'
            },
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                    book: { $first: { title: '$bookDocument.title', isbn: '$bookDocument.isbn' } }
                }
            },
            {
                $project: {
                    _id: 1,
                    book: 1,
                    totalQuantity: 1
                }
            }
        ];
        const borrowedSummary = yield borrows_model_1.default.aggregate(desiredPipeline);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrowedSummary
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Failed to retrieve borrowed books summary!',
            success: false,
            error: { message: error.message }
        });
    }
}));
exports.default = borrowRoutes;

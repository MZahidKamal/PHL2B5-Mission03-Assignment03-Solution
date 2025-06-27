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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'BookModel',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Borrowing quantity must not be less than 1!'],
        max: [2, 'Borrowing more than 2 books is not allowed!'],
        default: 1,
    },
    dueDate: {
        type: Date,
        required: true,
        default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        // 30 days, calculated in millisecond.
    }
}, {
    timestamps: true,
    versionKey: false,
});
// PRE HOOK (Document Middleware)
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { book, quantity } = this;
            const bookDocument = yield this.model('BookModel').findById(book);
            if (!bookDocument) {
                return next(new mongoose_1.Error('Book not found'));
            }
            if (!bookDocument.available) {
                return next(new mongoose_1.Error('Book is not available for borrowing'));
            }
            if (bookDocument.copies < quantity) {
                return next(new mongoose_1.Error(`Insufficient copies available. Requested: ${quantity}, Available only: ${bookDocument.copies}`));
            }
            next();
        }
        catch (error) {
            next(error instanceof mongoose_1.Error ? error : new mongoose_1.Error('Error processing borrow request'));
        }
    });
});
// POST HOOK (Document Middleware)
borrowSchema.post("save", function (borrowDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookDocument = yield this.model('BookModel').findById(borrowDocument.book);
            if (bookDocument) {
                bookDocument.copies -= borrowDocument.quantity;
                yield bookDocument.save();
                bookDocument.available = bookDocument.copies > 0;
                yield bookDocument.save();
            }
        }
        catch (error) {
            console.error('Error updating book copies: ', error.message);
        }
    });
});
const BorrowModel = (0, mongoose_1.model)('BorrowModel', borrowSchema);
exports.default = BorrowModel;

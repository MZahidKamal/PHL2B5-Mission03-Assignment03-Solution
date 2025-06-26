"use strict";
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
const BorrowModel = (0, mongoose_1.model)('BorrowModel', borrowSchema);
exports.default = BorrowModel;

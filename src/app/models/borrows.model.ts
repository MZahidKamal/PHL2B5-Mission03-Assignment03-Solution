import {Model, model, Schema} from "mongoose";
import BorrowInterface from "../interfaces/borrows.interface";


const borrowSchema = new Schema<BorrowInterface>({
        book: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


const BorrowModel: Model<BorrowInterface> = model('BorrowModel', borrowSchema);


export default BorrowModel;

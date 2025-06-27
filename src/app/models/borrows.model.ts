import {Model, model, Schema, Document, Error} from "mongoose";
import {BorrowInterface, BorrowInstanceMethodInterface} from "../interfaces/borrows.interface";
import {BookInterface} from "../interfaces/books.interface";





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





// PRE HOOK (Document Middleware)
borrowSchema.pre<Document & BorrowInterface>("save", async function(next) {
    try {
        const {book, quantity} = this;
        const bookDocument = await this.model('BookModel').findById(book) as Document & BookInterface;

        if (!bookDocument) {
            return next(new Error('Book not found'));
        }
        if (!bookDocument.available) {
            return next(new Error('Book is not available for borrowing'));
        }
        if (bookDocument.copies < quantity) {
            return next(new Error(`Insufficient copies available. Requested: ${quantity}, Available only: ${bookDocument.copies}`));
        }
        next();
    } catch (error) {
        next(error instanceof Error ? error : new Error('Error processing borrow request'));
    }
});





// POST HOOK (Document Middleware)
borrowSchema.post<Document & BorrowInterface>("save", async function(borrowDocument: Document & BorrowInterface) {
    try{
        const bookDocument = await this.model('BookModel').findById(borrowDocument.book) as Document & BookInterface;
        if (bookDocument) {
            bookDocument.copies -= borrowDocument.quantity;
            await bookDocument.save();
            bookDocument.available = bookDocument.copies > 0;
            await bookDocument.save();
        }
    } catch (error: any) {
        console.error('Error updating book copies: ', error.message);
    }
})






const BorrowModel = model<BorrowInterface, Model<BorrowInterface, {}, BorrowInstanceMethodInterface>>('BorrowModel', borrowSchema);





export default BorrowModel;

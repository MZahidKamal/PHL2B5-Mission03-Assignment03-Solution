import {Model, model, Schema} from "mongoose";
import {BookInterface, BookInstanceMethodInterface} from "../interfaces/books.interface";





const bookSchema = new Schema<BookInterface>({
        title: {
            type: String,
            required: [true, 'Title is required!'],
            trim: true,
            unique: [true, 'Title already exists!'],
            minlength: [3, 'Title must be at least 3 characters long!'],
            maxlength: [100, 'Title must be less than 100 characters long!'],
        },
        author: {
            type: String,
            required: [true, 'Author is required!'],
            trim: true,
            minlength: [3, 'Author must be at least 3 characters long!'],
            maxlength: [100, 'Author must be less than 100 characters long!'],
        },
        genre: {
            type: String,
            enum: {
                values: ['FICTION', 'NON-FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
                message: 'genre must be one of the following: Fiction, Non-Fiction, Science, History, Biography, Fantasy with all capital letter!'
            },
            required: [true, 'Genre is required!'],
        },
        isbn: {
            type: String,
            required: [true, 'ISBN is required!'],
            trim: true,
            unique: [true, 'ISBN already exists!'],
            minlength: [10, 'ISBN must be minimum 10 characters long!'],
            maxlength: [13, 'ISBN must be maximum 13 characters long!'],
        },
        description: {
            type: String,
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long!'],
            maxlength: [1000, 'Description must be less than 1000 characters long!'],
            default: 'No description available.'
        },
        copies: {
            type: Number,
            required: [true, 'Copies is required!'],
            min: [0, 'Copies must not be negative number!'],
            default: 1,
        },
        available: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);





// Instance method to remove all dashes from the user-inserted ISBN.
bookSchema.method('correctIsbnPattern', async function (originalIsbn: string): Promise<string> {
    // console.log(originalIsbn);
    this.isbn = originalIsbn.replace(/-/g, '');
    // console.log(this.isbn);
    return this.isbn;
})




// Instance method to check the availability of a book.
bookSchema.method('checkAndUpdateAvailability', async function (): Promise<void> {
    this.available = this.copies > 0;
    await this.save();
})





const BookModel = model<BookInterface, Model<BookInterface, {}, BookInstanceMethodInterface>>('BookModel', bookSchema);





export default BookModel;

import BookModel from "../models/books.model";
import express, {Request, Response, Router} from "express";


const bookRoutes: Router = express.Router();

// CREATE
bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const newBookObj = req.body;
        const newBook = await BookModel.create(newBookObj);
        res.status(201).json({
            success: true,
            message: 'New book created successfully!',
            data: newBook
        })
    } catch (error: any) {
        res.status(400).json({
            message: 'New book creation failed!',
            success: false,
            error: error.errors
        })
    }
});

// READ
bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        let {filter, sortBy, sort, limit} = req.query;

        let query = BookModel.find();

        if (filter) {
            const formattedFilter = filter.toString().charAt(0).toUpperCase() + filter.toString().slice(1).toLowerCase();
            query = query.where('genre').equals(formattedFilter);
        }
        if (sortBy && sort) {
            query = query.sort({[sortBy as string]: sort === 'desc' ? -1 : 1} as any);
        }
        if (limit) {
            query = query.limit(Number(limit));
        }

        const allBooks = await query;
        res.status(200).json({
            success: true,
            message: 'Getting all books si successful!',
            data: allBooks
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Getting all books failed!',
            success: false,
            error: error.errors || {message: error.message}
        });
    }
});

// READ
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const {bookId} = req.params as { bookId: string };
        const aBook = await BookModel.findById(bookId);

        res.status(200).json({
            success: true,
            message: 'Getting a book by id is successful!',
            data: aBook
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Getting a book by id is failed!',
            success: false,
            error: error.errors || {message: error.message}
        });
    }
});

// UPDATE
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const {bookId} = req.params as { bookId: string };
        const modifications = req.body;

        const updatedBook = await BookModel.findByIdAndUpdate(bookId, modifications, {new: true, runValidators: true});

        res.status(200).json({
            success: true,
            message: 'Getting a book by id and update it is successful!',
            data: updatedBook
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Getting a book by id and update it is failed!',
            success: false,
            error: error.errors || {message: error.message}
        });
    }
});


// DELETE
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const {bookId} = req.params as { bookId: string };

        await BookModel.findByIdAndDelete(bookId);
        const deletedBook = await BookModel.findById(bookId);

        res.status(200).json({
            success: true,
            message: 'Getting a book by id and update it is successful!',
            data: deletedBook
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Getting a book by id and update it is failed!',
            success: false,
            error: error.errors || {message: error.message}
        });
    }
});


export default bookRoutes;

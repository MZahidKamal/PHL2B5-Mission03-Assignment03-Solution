import BookModel from "../models/books.model";
import express, {Request, Response} from "express";


const bookRoutes = express.Router();


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


bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const allBooks = await BookModel.find();
        res.status(200).json({
            success: true,
            message: 'Getting all books successful!',
            data: allBooks
        })
    } catch (error: any) {
        res.status(400).json({
            message: 'Getting all books failed!',
            success: false,
            error: error.errors
        })
    }


})


export default bookRoutes;

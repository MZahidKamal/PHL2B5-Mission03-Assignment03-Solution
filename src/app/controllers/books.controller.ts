import BookModel from "../models/books.model";
import express, {Request, Response} from "express";


const bookRoutes = express.Router();





bookRoutes.post('/create_book', async (req: Request, res: Response) => {
    const newBookObj = req.body;
    const newBook = await BookModel.create(newBookObj);
    res.status(201).json({
        success: true,
        message: 'New book created successfully!',
        data: newBook
    })
});






bookRoutes.get("/", async (req: Request, res: Response) => {
    const allBooks = await BookModel.find();

    res.status(200).json({
        success: true,
        message: 'All books fetched successfully!',
        data: allBooks
    })
})



export default bookRoutes;

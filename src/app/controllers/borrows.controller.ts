import BorrowModel from "../models/borrows.model";
import express, {Request, Response, Router} from "express";





const borrowRoutes: Router = express.Router();





// CREATE
borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const newBorrowObj = req.body;
        const newBorrow = await BorrowModel.create(newBorrowObj);

        res.status(201).json({
            success: true,
            message: 'New borrow entry created successfully!',
            data: newBorrow
        })
    } catch (error: any) {
        res.status(400).json({
            message: 'New borrow entry creation failed!',
            success: false,
            error: error.errors || error.message
        })
    }
});





// READ
borrowRoutes.get('/', async (req: Request, res: Response) => {
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
                    totalQuantity: {$sum: '$quantity'},
                    book: {$first: {title: '$bookDocument.title', isbn: '$bookDocument.isbn'}}
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

        const borrowedSummary = await BorrowModel.aggregate(desiredPipeline);

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrowedSummary
        });
    } catch (error: any) {
        res.status(400).json({
            message: 'Failed to retrieve borrowed books summary!',
            success: false,
            error: {message: error.message}
        });
    }
});





export default borrowRoutes;

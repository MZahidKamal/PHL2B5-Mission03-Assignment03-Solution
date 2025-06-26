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
            error: error.errors
        })
    }
});

// READ
borrowRoutes.get('/', async (req: Request, res: Response) => {

});


export default borrowRoutes;

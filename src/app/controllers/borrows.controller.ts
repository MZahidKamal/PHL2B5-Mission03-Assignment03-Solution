import BorrowModel from "../models/borrows.model";
import express, {Request, Response, Router} from "express";


const borrowRoutes: Router = express.Router();

// CREATE
borrowRoutes.post('/', async (req: Request, res: Response) => {

});

// READ
borrowRoutes.get('/', async (req: Request, res: Response) => {

});


export default borrowRoutes;

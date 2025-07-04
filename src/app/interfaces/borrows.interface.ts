// Creating interface for the borrow model.
import {Types} from "mongoose";





interface BorrowInterface {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date,
}




interface BorrowInstanceMethodInterface {
    updateAvailability: () => Promise<void>
}




export {
    BorrowInterface,
    BorrowInstanceMethodInterface
};

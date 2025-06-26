import express, {Application, Request, Response} from "express";
import bookRoutes from "./app/controllers/books.controller";
import borrowRoutes from "./app/controllers/borrows.controller";


const app: Application = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Routes forwarding
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Server, created using ExpressJS, Mongoose and TypeScript!');
});


export default app;

import express, {Application, Request, Response} from "express";
import bookRoutes from "./app/controllers/books.controller";


const app: Application = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Routes forwarding
app.use('/api/books', bookRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Server, created using ExpressJS, Mongoose and TypeScript!');
});


export default app;

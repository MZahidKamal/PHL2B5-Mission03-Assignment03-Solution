import express, {Application, Request, Response} from "express";


const app: Application = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Server, created using ExpressJS, Mongoose and TypeScript!');
});


export default app;

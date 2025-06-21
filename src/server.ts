import {Server} from 'http';
import app from "./app";


const PORT = 5000;
let server: Server;


const bootstrap = async () => {
    try {
        // Running the server to see the output in the browser.
        server = app.listen(PORT, () => {
            console.log(`Library Management server listening on port ${PORT}`);
        });

    }
    catch (error) {
        console.log('Error in bootstrap!');
        console.log(error);
        process.exit(1);
    }
}


bootstrap().then();

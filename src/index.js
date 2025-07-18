import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setUpServer, startServer } from "./server.js";


const bootstrap = async () => {
    try {
        await initMongoConnection();
        startServer();
    } catch(error){
        console.error('Failed to start app', error);
    }
};

bootstrap();
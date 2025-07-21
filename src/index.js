import dotenv from 'dotenv';
dotenv.config();

import { initMongoConnection } from './db/initMongoConnection.js';
import { setUpServer, startServer } from "./server.js";
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
    try {
        await initMongoConnection();
        await createDirIfNotExists(TEMP_UPLOAD_DIR);
        await createDirIfNotExists(UPLOAD_DIR);
        startServer();
    } catch(error){
        console.error('Failed to start app', error);
    }
};

bootstrap();
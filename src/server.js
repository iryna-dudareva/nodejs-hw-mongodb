import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


export const setUpServer = () => {
    const app = express();

    app.use(cookieParser());
    app.use(cors());
    app.use(pino());
    app.use(express.json());
    app.use('/api-docs', swaggerDocs());
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use(router);
 

    app.get('/', (req, res) => {
        res.json({ message: "working!" });
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

export const startServer = () => {
    const PORT = process.env.PORT || 3000;
    const app = setUpServer();
    app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
    });
};

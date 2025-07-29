import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';



export const setUpServer = () => {
    const app = express();

    app.use(cookieParser());
    app.use(cors());
    app.use(pino());
    app.use(express.json());
    app.use(router);

    app.get('/', (req, res) => {
        res.json({ message: "working!" });
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

export const startServer = () => {
    const PORT = process.env.PORT;
    const app = setUpServer();
    app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
    });
};

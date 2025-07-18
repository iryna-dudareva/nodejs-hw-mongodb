import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import contactsRouter from './routes/contacts.routes.js'

export const setUpServer = () => {
    const app = express();

    app.use(cors());
    app.use(pino());
    app.use(express.json());
    app.use(contactsRouter);


    app.get('/', (req, res) => {
        res.json({ message: "workiing!" });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: "Not found"
        });
    });

    return app;
};

export const startServer = () => {
    const PORT = process.env.PORT;
    const app = setUpServer();
    app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
    });
};

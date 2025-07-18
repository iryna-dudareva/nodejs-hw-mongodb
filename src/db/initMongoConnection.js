import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const initMongoConnection = async () => {
    try {
        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const url = process.env.MONGODB_URL;
        const dbName = process.env.MONGODB_DB;
        const connectionString = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;
        await mongoose.connect(connectionString);

        console.log('Mongo connected');
    } catch (error) {
        console.error('Error connecting to Mongo', error);
        throw error;
    }
}; 
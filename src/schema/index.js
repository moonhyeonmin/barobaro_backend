import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_uri=process.env.DB_uri;

const conn = () => {
    mongoose.connect(DB_uri, {dbName: 'baro_db'},)
    .catch((err) => console.log(err)).then(() => console.log('db connect success'));
};

mongoose.connection.on('error', (err) => {
    console.error('db connect error', err);
});

export default conn;
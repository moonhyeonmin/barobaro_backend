import Mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const conn = () => {

    const DB_uri=process.env.DB_uri;
    
    Mongoose.connect(DB_uri, {dbName: 'baro_db'})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err);
    })
};

export default conn;
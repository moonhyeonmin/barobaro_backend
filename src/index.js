import express from "express";
import conn from "./schema/index.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const port = process.env.port;
conn();


app.listen(port, (req, res) => {
    console.log("listen at :  3000");
})
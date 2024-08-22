import express from "express";
import conn from "./schema/index.js";
import dotenv from "dotenv";
import AuthRouter from "./router/auth.js"

const app = express();
dotenv.config();

app.use(
    express.urlencoded({ extended: true}),
    express.json(),
);
app.use('/auth', AuthRouter);

const port = process.env.port;
conn();


app.listen(port, (req, res) => {
    console.log("listen at :  3000");
})
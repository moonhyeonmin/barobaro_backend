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

app.on('uncaughtException', function (err) {
    console.log(err);
}); 

const port = process.env.PORT;
conn();


app.listen(port, (req, res) => {
    console.log("listen at :  " + port);
})
import express from "express";
import conn from "./schema/index.js";
import dotenv from "dotenv";
import member from "./router/auth.js"

const app = express();
dotenv.config();

app.use(
    express.urlencoded({ extended: true}),
    express.json(),
);
app.use('/auth', member); // 이 부분 원래 app.use('./auth', require('./router/auth.js')) 이렇게 쓰는건데 ES6에서 어케 쓰는지 모르겠음

const port = process.env.port;
conn();


app.listen(port, (req, res) => {
    console.log("listen at :  3000");
})
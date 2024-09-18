import express from "express";
import conn from "./schema/index.js";
import dotenv, { parse } from "dotenv";
import AuthRouter from "./router/auth.js"
import { specs, swaggerUi } from "./swagger/config.js";
import BoardRouter from "./router/board.js";
import { board } from "./schema/board.js";
const app = express();
dotenv.config();

app.use(
    express.urlencoded({ extended: true}),
    express.json(),
);
app.use('/auth', AuthRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/board', BoardRouter);

app.on('uncaughtException', function (err) {
    console.log(err);
}); 

const port = process.env.PORT;
conn();


/**
 * @path {GET} http://localhost:3000/
 * @description 게시글 목록이 나오는 메인 페이지
 */
app.get('/', async (req, res) => {
    res.render("home", board.list(board));
});

app.listen(port, (req, res) => {
    console.log("listen at :  " + port);
})
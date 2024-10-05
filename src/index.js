import express from "express";
import conn from "./schema/index.js";
import dotenv, { parse } from "dotenv";
import AuthRouter from "./router/auth.js"
import { specs, swaggerUi } from "./swagger/config.js";
import BoardRouter from "./router/board.js";
import { board } from "./schema/board.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

app.use(
    express.urlencoded({ extended: true}),
    express.json(),
    cookieParser()
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
app.get('/main', async (req, res) => {
    const result = await board.find()
    console.log(result);
    res.send(result);

    // res.render("home", { // 내가 가져온 게시글을 home으로 렌더링 시켜서 띄우는 코드
    //     title: "Home",
    //     posts: result,
    // });
});

app.listen(process.env.serverUrl, (req, res) => {
    console.log("listen at :  " + process.env.serverUrl);
})
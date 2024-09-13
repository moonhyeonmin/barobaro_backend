import express from "express";
import conn from "./schema/index.js";
import dotenv, { parse } from "dotenv";
import AuthRouter from "./router/auth.js"
import { specs, swaggerUi } from "./swagger/config.js";
import BoardRouter from "./router/board.js";
import PostService from "./service/post.js";

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

app.get('/', async (req, res) => {
    const page = parse(req.query.page) || 1; // 현재 페이지 번호
    const search = req.query.serach || ""; // 검색어
    try {
        const [posts, paginator] = await PostService.list(collection, page, search);

        res.render("index", { title: "게시판", posts, paginator });
    } catch(error) {
        console.error("Error fetching posts", error);
        throw error;
    }
});

app.listen(port, (req, res) => {
    console.log("listen at :  " + port);
})
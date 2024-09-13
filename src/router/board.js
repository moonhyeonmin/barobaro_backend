// Description: 게시판 관련 라우터
import { Router } from 'express';
import { board } from '../schema/board.js';

const BoardRouter = Router();

BoardRouter.get('/write', (req, res) => {
    res.render("write", { title: "글쓰기" });
});

BoardRouter.post('/write', async (req, res) => {
    const Post = req.body;

    const result = await board.insertOne(Post);
    res.redirect(`./detail/${result.insertedId}`); // 여기서 디테일 페이지로 이동하고 싶은데 라우터로 어떻게 이동하는지 모르겠음 ㅠ
});

export default BoardRouter;
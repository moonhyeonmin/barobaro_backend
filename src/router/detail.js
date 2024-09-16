import { Router } from 'express';
import { post } from '../service/post.js';

const DetailRouter = Router();

DetailRouter('/detail/:id', async (req, res) => {
    const result = await post.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

export default DetailRouter;
import { Router } from 'express';
import { post } from '../service/post.js';

const DetailRouter = Router();

DetailRouter.get('/detail/:id', async (req, res) => {
    const result = await post.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "Detail",
        post: result.value,
    });
});

export default DetailRouter;
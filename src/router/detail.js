import { Router } from 'express';

const DetailRouter = Router();

DetailRouter('/detail/:id', (req, res) => {
    res.render("detail", { title: "상세보기" });
});

export default DetailRouter;
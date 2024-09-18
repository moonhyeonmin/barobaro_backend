// Description: 게시판 관련 라우터
import { Router } from 'express';
import { board } from '../schema/board.js';

const BoardRouter = Router();

BoardRouter.post('/write', async (req, res) => {
    const Post = req.body;

    const result = await board.insertOne(Post);
    res.redirect(`./detail/${result.insertedId}`); // 여기서 디테일 페이지로 이동하고 싶은데 라우터로 어떻게 이동하는지 모르겠음 ㅠ
});

BoardRouter.delete('/delete/:id', async (req, res) => { // 게시글 삭제
    const result = await board.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount === 1) {
        res.status(204).send({message: 'Delete Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
})

BoardRouter.get('/edit/:id', (req, res) => {
    board.findOne({_id: req.params.id}, (err, result) => {
        res.render('edit', {
            title: 'edit',
            post: result,
        })
    })
});

BoardRouter.put('/edit/:id', async (req, res) => {
    const result = await board.updateOne({ _id: req.params.id }, { $set: req.body});

    if (result.modifiedCount === 1) {
        res.status(200).send({message: 'Update Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
})
export default BoardRouter;
// Description: 게시판 관련 라우터
import { Router } from 'express';
import { board } from '../schema/board.js';

const BoardRouter = Router();

BoardRouter.post('/write', async (req, res) => {
    const Post = req.body; 

    const result = await board.insertOne(Post);
    res.send(Post.board_id);
});

BoardRouter.delete('/delete/:boardid', async (req, res) => { // 게시글 삭제
    const result = await board.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount === 1) {
        res.status(204).send({message: 'Delete Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
});

BoardRouter.put('/edit/:boardid', async (req, res) => {
    const result = await board.updateOne({ _id: req.params.id }, { $set: req.body});

    if (result.modifiedCount === 1) {
        res.status(200).send({message: 'Update Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
})
export default BoardRouter;
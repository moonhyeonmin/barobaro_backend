// Description: 게시판 관련 라우터
import { Router } from 'express';
import { board } from '../schema/board.js';

const BoardRouter = Router();

BoardRouter.post('/', async (req, res) => {
    const Post = {
        type: req.body.type,
        userName: req.body.userName,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        major: req.body.major,
        board_id: req.body.board_id,
    } 

    const result = await board.create(Post); // insertOne 왜 삽입 안됨?
    res.send(result);
});

BoardRouter.delete('/:board_id', async (req, res) => { // 게시글 삭제
    const result = await board.deleteOne({ board_id: parseInt(req.params.board_id) });  
    const test = await board.find();
    console.log(test);
    console.log(result);
    if (result.deletedCount === 1) {
        res.status(204).send({message: 'Delete Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
});

BoardRouter.put('/:board_id', async (req, res) => {
    const result = await board.updateOne({ board_id: req.params.board_id }, { $set: req.body});

    if (result.modifiedCount === 1) {
        res.status(200).send({message: 'Update Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
})
export default BoardRouter;
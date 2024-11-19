// Description: 게시판 관련 라우터
import { Router } from 'express';
import { board } from '../schema/board.js';
import { counter } from '../schema/counter.js';

const BoardRouter = Router();

BoardRouter.post('/write', async (req, res) => { // board_id 생성하는 코드 필요
    counter.insertOne({_id: 'req.body.title', seq: 0});
    function getNextSequence(name) {
        var ret = counter.findAndModify({
            query: {_id: name},
            update: {$inc: {seq: 1}},
            new: true
        });
        return ret.seq;
    }


    const Post = {
        type: req.body.type,
        userName: req.body.userName,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        major: req.body.major,
        board_id: getNextSequence('req.body.title')
    } 
    const result = await board.create(Post); // insertOne 왜 삽입 안됨?
    res.send(result);
});

BoardRouter.delete('/del/:board_id', async (req, res) => { // 게시글 삭제
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

BoardRouter.put('/edit/:board_id', async (req, res) => {
    const result = await board.updateOne({ board_id: req.params.board_id }, { $set: req.body});

    if (result.modifiedCount === 1) {
        res.status(200).send({message: 'Update Success'});
    }
    else {
        res.status(404).send({message: 'Not Found'});
    }
})
export default BoardRouter;
import express from 'express';
import { waiting } from '../schema/waiting.js';
import redis from 'redis';

const WaitingRouter = express.Router();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

WaitingRouter.post('/', async (req, res) => {
    const QUEUE_KEY = req.body.board_id;
    const WAITING_KEY = 'waiting';

    const id = req.body.id;
    const name = req.body.name; 

    const queueNumber = await client.incr(WAITING_KEY);

    const user = {
        id: id,
        name,
        queueNumber,
    };

    await client.rpush(QUEUE_KEY, JSON.stringify(user));

    res.status(201).json({
        message: 'Success',
        user,
    })
})

WaitingRouter.post('/status', async(req, res) => {
    const id = req.body.id;
    const QUEUE_KEY = req.body.board_id;
    const queue = await client.lrange(QUEUE_KEY, 0, -1);

    const user = queue.map((item) => JSON.parse(item)).find((user) => user.id === id);

    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }

    const position = queue.findIndex((item) => JSON.parse(item).id === id) + 1;
    res.json({
        queueNumber: user.queueNumber,
        position,
    });
});


export default WaitingRouter;
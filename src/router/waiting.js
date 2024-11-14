import express from 'express';
import { waiting } from '../schema/waiting.js';
import redis from 'redis';

const WaitingRouter = express.Router();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

const connRedis = (async () => {
    try {
        await client.connect();
        console.log('Redis connected');
    } catch (error) {
        console.error('Redis connection failed', error);
    }
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

WaitingRouter.post('/', async (req, res) => { // 대기열에 추가 key: board_id, value: user
    const QUEUE_KEY = req.body.board_id.toString();

    const id = req.body.id;
    const name = req.body.name; 
    
    const queueNumber = await client.incr(QUEUE_KEY);

    console.log(QUEUE_KEY, typeof QUEUE_KEY);


    await client.set(`${QUEUE_KEY}-${id}`, queueNumber);

    res.status(201).json({
        message: 'Success',
        QUEUE_KEY, id, queueNumber
    })
})

WaitingRouter.post('/status', async(req, res) => {
    const id = req.body.id;
    const QUEUE_KEY = req.body.board_id.toString();
    const queue = await client.get(`${QUEUE_KEY}-${id}`);

    console.log(queue, QUEUE_KEY, id);

    if(!queue){
        return res.status(404).json({ error: 'User not found' });
    }

    
    
    res.json({
        queueNumber: queue,
    });
});


export {WaitingRouter, connRedis, client};
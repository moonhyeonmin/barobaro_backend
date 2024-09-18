import { ObjectId } from 'mongodb';

async function list(collection, search) {
    const query = { title: new RegExp(search, 'i') };
    const cursor = collection.find(query).sort({
        date: -1,
    });

    const posts = await cursor.toArray(); // 커서로 받아온 데이터 리스트로 변경
    return posts;
    };

async function getDetailPost(collection, id) {
    return await collection.findOneAndUpdate({_id: ObjectId(id)}, {$inc: {views: 1 } });
};

const post = { list, getDetailPost };
export default { post };
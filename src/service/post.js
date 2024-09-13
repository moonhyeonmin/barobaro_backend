import { Paginator } from './paginator/paginator.js';

async function list(collection, page, search) {
    const limit = 10;
    const query = { title: new RegExp(search, 'i') };
    const cursor = collection.find(query, {limit : limit, skip: (page - 1) * limit}).sort({
        date: -1,
    });
    const total = await collection.count(query);
    const posts = await cursor.toArray(); // 커서로 받아온 데이터 리스트로 변경
    // 페이지네이터 생성
    const paginator = Paginator({ total, limit: limit, page});
    return [posts, paginator];
    }

export default { list };
import _ from 'lodash';
const PAGE_LIST_SIZE = 10;

function Paginator({ total, page, perPage = 10 }) {
    const PER_PAGE = perPage;
    const totalPage = Math.ceil(total / PER_PAGE); // 전체 페이지 수

    let quotient = parseInt(page / PAGE_LIST_SIZE); // 몫
    if (page % PAGE_LIST_SIZE === 0) {
        quotient -= 1;
    }

    const startPage = quotient * PAGE_LIST_SIZE + 1; // 시작 페이지

    const endPage = Math.min((quotient + 1) * PAGE_LIST_SIZE, totalPage); // 끝 페이지
    const isFirstPage = page === 1; // 첫 페이지 여부
    const isLastPage = page === totalPage; // 마지막 페이지 여부
    const hasPrev = !isFirstPage; // 이전 페이지 여부
    const hasNext = !isLastPage; // 다음 페이지 여부

    const paginator = {
        pageList : _.range(startPage, endPage + 1), // 페이지 리스트
        page,
        prevPage: hasPrev ? page - 1 : null, // 이전 페이지
        nextPage : hasNext ? page + 1 : null, // 다음 페이지
        startPage, // 시작 페이지
        lastPage : totalPage, // 마지막 페이지
        hasPrev, // 이전 페이지 여부
        hasNext, // 다음 페이지 여부
        isFirstPage, // 첫 페이지 여부
        isLastPage, // 마지막 페이지 여부
    };
    return paginator;
};


export { Paginator };
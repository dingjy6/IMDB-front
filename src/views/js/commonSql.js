import request from '@/request';
const PATH = '/api/mysql/imdb/';

//Derive the my-sql result from sqlQuery
export const getSQL = (sqlQuery, page) => {
    return request({
      url: PATH + 'commonSQL',
      method: 'POST',
      data:{
        sqlQuery:sqlQuery.mysql,
        mongoQuery:sqlQuery.mongo,
        pageFrom: (page.current - 1) * page.pageSize,
        pageSize: page.pageSize
      }
    });
}
//Derive the total counts for my-sql query
export const getTotal = (sqlQuery) => {
  return request({
    url: PATH + 'getTotal',
    method: 'POST',
    data:{
      sqlQuery:sqlQuery.mysql,
      mongoQuery:sqlQuery.mongo,
    }
  });
}

//Derive the Celeberities info in specific condition & page
export const getName = (condition, page) => {
  return request({
    url: PATH + 'getName',
    method: 'POST',
    data:{
      condition:condition,
      pageFrom:(page.current - 1) * page.pageSize,
      pageSize: page.pageSize
    }
  });
}

//Derive the Celeberities info in specific condition & page
export const getNameDetail = (nid) => {
  return request({
    url: PATH + 'getNameDetail',
    method: 'POST',
    data:{
      nid:nid
    }
  });
}

//Derive all genres
export const getGenres = () => {
  return request({
    url: PATH + 'getGenres',
    method: 'GET',
  });
}

//Derive the Celeberities info in specific condition & page
export const getMovie = (condition, page) => {
  return request({
    url: PATH + 'getMovie',
    method: 'POST',
    data:{
      condition:condition,
      pageFrom:(page.current - 1) * page.pageSize,
      pageSize: page.pageSize
    }
  });
}

//Derive the Celeberities info in specific condition & page
export const getMovieDetail = (tid) => {
  return request({
    url: PATH + 'getMovieDetail',
    method: 'POST',
    data:{
      tid:tid
    }
  });
}

//Derive the Celeberities info in specific condition & page
export const getReviewCasts = (reviewIDs,nids) => {
  return request({
    url: PATH + 'getReviewsCasts',
    method: 'POST',
    data:{
      reviewIDs:reviewIDs,
      nids:nids
    }
  });
}

//Derive the Celeberities info in specific condition & page
export const recommendMovies = (tids) => {
  return request({
    url: PATH + 'recommendMovies',
    method: 'POST',
    data:{
      tids:tids
    }
  });
}
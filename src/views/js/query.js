
export const queryList = [
    {
      queryName:'Celebrities under age of 18#',
      queryContent:{
        mysql:'SELECT primaryName,birthYear, YEAR(NOW()) - birthYear AS age FROM name_basics WHERE birthYear > (YEAR(NOW()) - 18) ORDER BY  birthYear DESC',
        mongo:"db.collection('name_basics').aggregate([ { $match: { 'birthYear': { $gte: 2023 - 18 } } }, { $project: { age: { $subtract: [2023, '$birthYear'] }, primaryName: 1, _id: 0, birthYear: 1, } }, { $sort: { age: 1 } } ])"
      }
    },
    {
      queryName:'Show movies with Action and Adventure genres, excluding Sci-fi and Fantasy*',
      queryContent:{
        mysql:'SELECT * FROM title_basics WHERE tid IN(((SELECT tid FROM title_genres WHERE Genres = "Action") INTERSECT (SELECT tid FROM title_genres WHERE Genres = "Adventure")) EXCEPT ((SELECT tid FROM title_genres WHERE Genres = "Sci-fi") UNION (SELECT tid FROM title_genres WHERE Genres = "Fantasy")))',
        mongo:"db.collection('title_basics').find({ 'genres': {'$all': ['Action', 'Adventure'], '$nin': ['Sci-fi', 'Fantasy']} })"
      }
    },
    {
      queryName:'Display the top five actor names ranked by their movie count and the average rating of those movies#',
      queryContent:{
        mysql:"SELECT * FROM(SELECT nid, primaryName FROM(SELECT nid, count(tid) AS number_of_movies, avg(averageRating) AS average_rating FROM title_principals natural JOIN title_ratings WHERE category ='actor' OR category='actress' GROUP BY nid) AS rating_table natural JOIN name_basics ORDER BY number_of_movies desc, average_rating DESC limit 5)t  ",
        mongo:"db.collection('title_basics').aggregate([ { $match: {'averageRating': { $exists: true, $ne: null }}}, { $unwind: '$principal' }, { $match: { $or: [{ 'principal.category': 'actor' }, { 'principal.category': 'actress' }]} }, { $group: { '_id': '$principal.nid', 'count': { $sum: 1 }, 'avg_rating': { $avg: '$averageRating' }} }, { $sort: { 'count': -1, 'avg_rating': -1 } }, { $limit: 5 }, {$lookup: { from: 'name_basics', localField: '_id', foreignField: 'nid', as: 'name_info'}}, {$unwind: '$name_info'}, {$project: { _id: 0, nid: '$_id', primaryName: '$name_info.primaryName'}} ])"
      }
    },
    {
      queryName:'The French version of the highest-grossing movies in the US & Canada box office#',
      queryContent:{
        mysql:"SELECT * FROM(SELECT ta.title as FrenchTitle, tp.`Gross US & Canada` FROM title_akas ta JOIN title_profits tp using(tid) WHERE ta.language = 'fr' AND tp.`Gross US & Canada` IS NOT NULL ORDER BY CAST(REPLACE(REPLACE(tp.`Gross US & Canada`, '$', ''), ',', '') AS DECIMAL) DESC limit 1)t ",
        mongo:"db.collection('title_basics').aggregate([ { $match: { 'Gross US & Canada': { $ne: null }, 'akas.language': 'fr' } }, { $addFields: { grossUSCanadaNumeric: { $toDouble: { $replaceAll: { input: { $substr: ['$Gross US & Canada', 1, { $strLenCP: '$Gross US & Canada' }] }, find: ',', replacement: '' } } } } }, { $unwind: '$akas' }, { $sort: { grossUSCanadaNumeric: -1 } }, { $limit: 1 }, { $project: { _id: 0, 'FrenchTitle':'$akas.title', 'Gross US & Canada': 1 } } ])"
      }
    },
    {
      queryName:'The highest-grossing movies worldwide for each unique genre between 2013 and 2023#',
      queryContent:{
        mysql:"SELECT DISTINCT TG.genres, MAX(CAST(REPLACE(REPLACE(tp.grossWorldwide, '$', ''), ',', '') AS DECIMAL)) AS max_gross FROM title_profits TP JOIN title_genres TG USING(tid) JOIN title_basics TB USING(tid) WHERE TB.startYear BETWEEN 2013 AND 2023 AND tp.grossWorldwide IS NOT NULL GROUP BY TG.genres ",
        mongo:"db.collection('title_basics').aggregate([ { $match: { 'startYear': { $gte: 2013, $lte: 2023 }, 'Gross worldwide': { $ne: null }, 'genres': { $ne: null, $ne: '' } } }, { $addFields: { grossWorldwideNumeric: { $toDouble: { $replaceAll: { input: { $substr: ['$Gross worldwide', 1, { $strLenCP: '$Gross worldwide' }] }, find: ',', replacement: '' } } } } }, { $unwind: '$genres' }, { $sort: { 'startYear': 1, grossWorldwideNumeric: -1 } }, { $group: { _id: { genres: '$genres' }, topMovie: { $first: '$$ROOT' } } }, { $replaceRoot: { newRoot: '$topMovie' } }, { $project: { _id: 0, genres: '$genres', max_gross: '$Gross worldwide' } } ])"
      }
    },
    {
      queryName:'Locate adult drama movies with "love" in their title*',
      queryContent:{
        mysql:"select distinct title_basics.tid as tid,primaryTitle from title_basics join title_genres on title_basics.tid=title_genres.tid where genres='Drama' and title_basics.primaryTitle like '%love%' and title_basics.isAdult=1   ",
        mongo:"db.collection('title_basics').find({ $and: [ { primaryTitle: /love/i }, { genres: /Drama/ }, { isAdult: 1 } ] },{_id:0,tid:1,primaryTitle:1}) "
      }
    },
    {
      queryName:'Three best action movies with reviews since 1980*',
      queryContent:{
        mysql:"SELECT * FROM(SELECT tr.tid, primaryTitle, averageRating FROM title_ratings tr JOIN title_basics USING( tid) JOIN title_genres USING ( tid ) WHERE startYear > 1980 AND genres = 'Action' AND EXISTS ( SELECT 1 FROM title_reviews trv WHERE tr.tid = trv.tid ) ORDER BY tr.averageRating DESC LIMIT 3)t ",
        mongo:"db.collection('title_basics').find( {ReviewIDs:{$exists:true, $ne:null},genres:{$in:['Action']}, startYear:{$gt:1980} },{_id:0, tid:1,primaryTitle:1, averageRating:1}).sort({averageRating:-1}).limit(3)"
      }
    },
    {
      queryName:'Find the ten most reviewed movies after 1980*',
      queryContent:{
          mysql:"SELECT * FROM(SELECT title_basics.primaryTitle, title_basics.startYear, COUNT(title_reviews.tid) AS reviewCount FROM title_reviews JOIN title_basics ON title_reviews.tid = title_basics.tid WHERE title_basics.startYear > 1980 GROUP BY title_reviews.tid ORDER BY reviewCount DESC, title_basics.startYear DESC LIMIT 10)t ",
          mongo:"db.collection('title_basics').find({ 'startYear': { $gt: 1980 } },{'primaryTitle':1,'numReviews':1,'_id':0,'startYear':1}) .sort({ 'numReviews': -1 }) .limit(10) "
      }
    },
  ]
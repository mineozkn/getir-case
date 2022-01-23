'use strict';

const { MongoClient } = require('mongodb');
const moment = require('moment');

const uri = process.env.mongoURI || 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';
const client = new MongoClient(uri);


exports.records =async function(req, res) {
    try {
        const body = req.body;
        if (!body) {
            return {
              code: 1,
              msg: 'Please check necesseray parameters',
              records: [],
            };
          }

        await client.connect();
        const dbName = process.env.dbName || 'getir-case-study'
        const database = client.db(dbName);
        const collection = database.collection('records');
    
        const {
          startDate, endDate, minCount, maxCount,
        } = body;
    
        if (!startDate || !endDate || !minCount || !maxCount || startDate === '' || endDate === '' || minCount === '' || maxCount === '') {
          return {
            code: 2,
            msg: 'Missing parameter. Please check necesseray parameters',
            records: [],
          };
        }
    
        if (!startDate || !endDate) {
          return {
            code: 3,
            msg: 'Wrong Date Format',
            records: [],
          };
        }
    
        const records = await collection.aggregate(
          [{
            $match: {
              $and: [{ $expr: { $gt: [{ $sum: '$counts' }, parseFloat(minCount)] } },
                { $expr: { $lt: [{ $sum: '$counts' }, parseFloat(maxCount)] } },
                {
                  createdAt: {
                    $gte: moment(new Date(startDate)).toDate(),
                    $lt: moment(new Date(endDate)).toDate(),
                  },
                }],
            },
    
          },
          {
            $addFields: {
              totalCount: { $sum: '$counts' },
            },
          },
          {
            $project: {
              _id: 0, value: 0, counts: 0,
            },
          }],
        ).toArray();
    
        const result = {
          code: 0,
          msg: 'Success',
          records,
        };
        res.json(result);
      } catch(err) {
        res.send(err);
      } finally {
        await client.close();
      }
};



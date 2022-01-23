const { dateFunction, dateFormat, countFunction } = require('./src/helper/common');
const request = require('supertest');
const bodyParser = require('body-parser');
const routes = require('./src/routers/router'); //importing route

const body = {
    startDate: "2017-01-01",
    endDate: "2022-01-01",
    minCount: 200,
    maxCount: 3000
};


describe('Test Post Records', () => {
    test('body inclued neccessary parameters', () => {
        expect(body).toHaveProperty('startDate');
        expect(body).toHaveProperty('endDate');
        expect(body).toHaveProperty('minCount');
        expect(body).toHaveProperty('maxCount');

    })
    test('body is object', () => {
        expect(body).toMatchObject(body)
    });

    test(`startDate is 'YYYY-MM-DD' format`, () => {
        expect(dateFormat(body.startDate)).toBeTruthy();
    });

    test(`endDate is 'YYYY-MM-DD' format`, () => {
        expect(dateFormat(body.endDate)).toBeTruthy();
    });

    test('endDate is bigger than startDate', () => {
        expect(dateFunction(body.startDate, body.endDate)).toBeTruthy();
    });

    test('maxCount is bigger than minCount', () => {
        expect(countFunction(body.minCount, body.maxCount)).toBeTruthy();
    });
});

describe('Test Response', () => {
    let app
    beforeAll(() => {
        const express = require('express');
        app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        routes(app);
    })

    afterAll(() => {
        app.close();
        done();
    })

    test('Records Service', async () => {
        await request(app).post('/records').send(body)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject(res.body);
                expect(res.body).toHaveProperty('code', 0);
                expect(res.body).toHaveProperty('msg', 'Success');
                expect(res.body).toHaveProperty('records');

            });
    });

    test('Records Response', async () => {
        const res = await request(app).post('/records').send(body);
        const records = res.body && res.body.records ? res.body.records : [];
        for (const data of records) {
            expect(data).toHaveProperty('key');
            expect(data).toHaveProperty('createdAt');
            expect(data).toHaveProperty('totalCount');
            expect(countFunction(body.minCount, data.totalCount)).toBeTruthy();
            expect(countFunction(data.totalCount, body.maxCount)).toBeTruthy();
            expect(dateFunction(body.startDate, data.createdAt)).toBeTruthy();
            expect(dateFunction(data.createdAt, body.endDate)).toBeTruthy();
        }
    });

});
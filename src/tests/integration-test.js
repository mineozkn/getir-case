
const recordServise = require('../src/controllers/controller');

// beforeAll(() => {
//     // Lock Time
//     dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
// });

// afterAll(() => {
//     // Unlock Time
//     dateNowSpy.mockRestore();
// });

describe('Get Records test', () => {
    test(`Get Records- All parameters should have value`, async () => {
        try {
            const body = {
                startDate: moment().add(-1, 'year').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD'),
                minCount: 500,
                maxCount: 3000
            }
            const res = await recordServise(body);
            const data = res.status;
            expect(data).toBe(200);
        } catch (error) {
            console.log(error)
        }
    })

});
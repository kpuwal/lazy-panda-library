const request = require('supertest');
// const supertest = require('supertest');
// const http = require('http');
const app = require('../app').default;
// const request = supertest(http.createServer(app.callback()));
// describe('Router Tests', () => {
//   it('should fetch the picker categories', async () => {
//     try {
//     const res = await request(app)
//       .get('/api/picker')
//       expect(res.statusCode).toEqual(400)
//     expect(res.body).toHaveProperty('App is not running...')
//     } catch (err) {
//     }
//   })
// })

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
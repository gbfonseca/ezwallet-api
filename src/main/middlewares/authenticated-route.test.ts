import request from 'supertest';
import app from '../config/app';
import setupMiddlewares from '../config/middlewares';
describe('Authenticated Route', () => {
  beforeAll(() => {
    setupMiddlewares(app);
  });
  test('should return 400 if invalid token provided', async () => {
    app.get('/authenticated_test', (req, res) => {
      if (!req.headers.authorization) {
        res
          .status(400)
          .json({ auth: false, message: 'Invalid token provided' });
      }
      res.send(req.body);
    });
    await request(app).get('/authenticated_test').expect(400);
  });
  test('should return 200 if token is valid', async () => {
    app.get('/authenticated_test', (req, res) => {
      if (!req.headers.authorization) {
        res
          .status(400)
          .json({ auth: false, message: 'Invalid token provided' });
      }
      res.send(req.body);
    });
    await request(app)
      .get('/authenticated_test')
      .set('Authorization', 'Bearer token')
      .expect(200);
  });
});

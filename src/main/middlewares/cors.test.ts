import request from 'supertest';
import app from '../config/app';
import setupMiddlewares from '../config/middlewares';
describe('Cors Middleware', () => {
  beforeAll(() => {
    setupMiddlewares(app);
  });
  test('should app allow cors', async () => {
    app.get('/cors_test', (req, res) => {
      res.send();
    });

    await request(app)
      .get('/cors_test')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-origin', '*');
  });
});

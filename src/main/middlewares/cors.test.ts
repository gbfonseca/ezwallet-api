import request from 'supertest';
import app from '../config/app';

describe('Content Type Middleware', () => {
  test('should app returns content type json data', async () => {
    app.get('/cors_test', (req, res) => {
      res.send();
    });

    await request(app)
      .get('/cors_test')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-header', '*')
      .expect('access-control-allow-origin', '*');
  });
});

import request from 'supertest';
import app from '../config/app';
import setupMiddlewares from '../config/middlewares';
describe('Body Parser Middleware', () => {
  beforeAll(() => {
    setupMiddlewares(app);
  });
  test('should app returns a json data', async () => {
    app.post('/body_parser_test', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/body_parser_test')
      .send({ ok: 'ok' })
      .expect({ ok: 'ok' });
  });
});

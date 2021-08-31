import request from 'supertest';
import app from '../config/app';

describe('Body Parser Middleware', () => {
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

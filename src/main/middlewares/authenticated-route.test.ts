import request from 'supertest';
import app from '../config/app';
describe('Authenticated Route', () => {
  test('should return an user on success', async () => {
    app.get('/authenticated_test', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .get('/authenticated_test')
      .set('Authorization', 'Bearer token')
      .expect(200);
  });
});

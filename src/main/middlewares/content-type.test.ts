import request from 'supertest';
import app from '../config/app';

describe('Content Type Middleware', () => {
  test('should app returns content type json data', async () => {
    app.get('/content_type_test', (req, res) => {
      res.send();
    });

    await request(app).get('/content_type_test').expect('content-type', /json/);
  });

  test('should app returns content type xml data', async () => {
    app.get('/content_type_xml_test', (req, res) => {
      res.type('xml');
      res.send();
    });

    await request(app)
      .get('/content_type_xml_test')
      .expect('content-type', /xml/);
  });
});

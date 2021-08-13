import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (q, r) => {
      r.send()
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (q, r) => {
      r.type('xml')
      r.send()
    })

    await request(app).get('/test_content_type_xml').expect('content-type', /xml/)
  })
})

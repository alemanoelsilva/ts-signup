import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL || ''))

  afterAll(async () => MongoHelper.disconnect())

  afterEach(async () => MongoHelper.getCollection('accounts').deleteMany({}))

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Ale',
        email: 'ale@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})

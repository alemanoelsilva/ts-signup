import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let collection: Collection

describe('Login Routes', () => {
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL || ''))

  afterAll(async () => MongoHelper.disconnect())

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await collection.insertOne({
        name: 'Ale',
        email: 'ale@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'ale@email.com',
          password: '123'
        })
        .expect(200)
    })
  })
})

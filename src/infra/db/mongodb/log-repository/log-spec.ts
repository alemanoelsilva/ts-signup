import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let collection
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL || ''))

  afterAll(async () => MongoHelper.disconnect())

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('errors')
    await collection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('an_error')
    const count = await collection.countDocuments()
    expect(count).toBe(1)
  })
})
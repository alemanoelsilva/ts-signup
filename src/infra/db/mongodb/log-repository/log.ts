import { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const collection = await MongoHelper.getCollection('errors')
    collection.insertOne({ stack, date: new Date() })
  }
}

import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let collection: Collection

describe('Account Mongo Repository ', () => {
  beforeAll(async () => MongoHelper.connect(process.env.MONGO_URL || ''))

  afterAll(async () => MongoHelper.disconnect())

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await collection.insertOne({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const account = await sut.loadByEmail('any_email')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()

    const account = await sut.loadByEmail('any_email')

    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()

    const res = await collection.insertOne({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const [{ _id, accessToken }] = res.ops

    expect(accessToken).toBeFalsy()

    await sut.updateAccessToken(_id, 'any_token')

    const account = await collection.findOne({ _id })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})

import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const logMongoRepository = new LogMongoRepository()

  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpControler = new SignUpController(dbAddAccount, makeSignUpValidation())

  return new LogControllerDecorator(signUpControler, logMongoRepository)
}

import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepository: LogErrorRepository
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve({
        statusCode: 200,
        body: {
          name: 'Ale'
        }
      }))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepository = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepository)

  return {
    sut,
    controllerStub,
    logErrorRepository
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handlySpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: 'any_body',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(httpRequest)
    expect(handlySpy).toBeCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerStub } = makeSut()
    jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: 'any_body',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Ale'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(serverError(fakeError))
    const logSpy = jest.spyOn(logErrorRepository, 'log')

    const httpRequest = {
      body: 'any_body',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})

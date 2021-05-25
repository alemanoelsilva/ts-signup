import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
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

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
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
})

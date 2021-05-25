import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    class ControlerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({
          statusCode: 200,
          body: {
            name: 'Ale'
          }
        }))
      }
    }

    const controlerStub = new ControlerStub()
    const handlySpy = jest.spyOn(controlerStub, 'handle')
    const sut = new LogControllerDecorator(controlerStub)
    const httpRequest = {
      body: 'any_body',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(httpRequest)
    expect(handlySpy).toBeCalledWith(httpRequest)
  })
})

import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controler: Controller

  constructor (controller: Controller) {
    this.controler = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controler.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      console.log(httpResponse.body)
    }
    return httpResponse
  }
}

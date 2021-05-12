import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { httpResponse, httpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    const fieldNotFound = ['name', 'email', 'password', 'passwordConfirmation']
      .find(field => !httpRequest.body[field])

    if (fieldNotFound) {
      return badRequest(new MissingParamError(fieldNotFound))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}

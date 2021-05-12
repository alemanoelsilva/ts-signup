import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controllers'
import { EmailValidator } from '../protocols/email-validator'
import { httpResponse, httpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    const fieldNotFound = ['name', 'email', 'password', 'passwordConfirmation']
      .find(field => !httpRequest.body[field])

    if (fieldNotFound) {
      return badRequest(new MissingParamError(fieldNotFound))
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}

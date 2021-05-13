import { Controller, HttpResponse, HttpRequest, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helpers'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const fieldNotFound = ['name', 'email', 'password', 'passwordConfirmation']
        .find(field => !httpRequest.body[field])

      if (fieldNotFound) {
        return badRequest(new MissingParamError(fieldNotFound))
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ name, email, password })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}

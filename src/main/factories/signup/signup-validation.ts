import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validtions: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validtions.push(new RequiredFieldValidation(field))
  }

  validtions.push(
    new CompareFieldsValidation('password', 'passwordConfirmation')
  )

  validtions.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validtions)
}

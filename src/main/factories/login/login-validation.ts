import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validtions: Validation[] = []

  for (const field of ['email', 'password']) {
    validtions.push(new RequiredFieldValidation(field))
  }

  validtions.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validtions)
}

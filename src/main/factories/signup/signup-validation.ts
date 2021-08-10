import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
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

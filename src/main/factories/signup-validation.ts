import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validtions: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validtions.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validtions)
}

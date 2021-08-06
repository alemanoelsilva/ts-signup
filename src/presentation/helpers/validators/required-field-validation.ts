import { MissingParamError } from '../../errors'
import { Validation, VALIDATION_TYPE } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): VALIDATION_TYPE {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}

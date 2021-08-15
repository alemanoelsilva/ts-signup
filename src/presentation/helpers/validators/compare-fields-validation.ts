import { InvalidParamError } from '../../errors'
import { Validation, VALIDATION_TYPE } from '../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate(input: any): VALIDATION_TYPE {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}

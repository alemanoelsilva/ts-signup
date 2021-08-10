import { MissingParamError } from '../../errors'
import { Validation, VALIDATION_TYPE } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: string): VALIDATION_TYPE {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new MissingParamError(this.fieldToCompareName)
    }
  }
}

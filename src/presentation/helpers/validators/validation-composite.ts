import { Validation, VALIDATION_TYPE } from './validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): VALIDATION_TYPE {
    for (const validation of this.validations) {
      const error = validation.validate(input)

      if (error) return error
    }
  }
}
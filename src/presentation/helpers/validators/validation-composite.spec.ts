import { MissingParamError } from '../../errors'
import { Validation, VALIDATION_TYPE } from './validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationsStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): VALIDATION_TYPE {
      return null
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationsStub = makeValidation()

  const sut = new ValidationComposite([validationsStub])

  return {
    sut,
    validationsStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationsStub } = makeSut()

    jest
      .spyOn(validationsStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})

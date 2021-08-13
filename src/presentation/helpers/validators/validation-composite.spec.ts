import { MissingParamError } from '../../errors'
import { Validation, VALIDATION_TYPE } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationsStubs: Validation[]
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
  const validationsStubs = [makeValidation(), makeValidation()]

  const sut = new ValidationComposite(validationsStubs)

  return {
    sut,
    validationsStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationsStubs } = makeSut()

    jest.spyOn(validationsStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationsStubs } = makeSut()

    jest.spyOn(validationsStubs[0], 'validate').mockReturnValueOnce(new Error())

    jest.spyOn(validationsStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeFalsy()
  })
})

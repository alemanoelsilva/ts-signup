export type VALIDATION_TYPE = Error | null | undefined
export interface Validation {
  validate: (input: any) => VALIDATION_TYPE
}

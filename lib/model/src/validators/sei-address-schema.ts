import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { string } from 'zod'

function validate(value: string): boolean {
  return /^sei1[a-zA-Z0-9]{58}$/.test(value)
}

export const seiAddressSchema = string().refine(validate, () => ({
  message: ValidatorError.InvalidSeiAddress
}))

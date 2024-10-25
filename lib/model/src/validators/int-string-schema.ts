import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { string, z } from 'zod'

export const intStringSchema = string()
  .min(1)
  .transform((val, ctx) => {
    const parsed = parseInt(val, 10)
    const parsedFloat = parseFloat(val)
    if (isNaN(parsed) || !Number.isInteger(parsedFloat)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ValidatorError.InvalidInteger
      })
      return z.NEVER
    }
    return parsed
  })
  .readonly()

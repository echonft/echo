import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { pipe } from 'ramda'
import { string, z } from 'zod'

export const bigIntStringSchema = string()
  .min(1)
  .transform((val, ctx) => {
    function onError() {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ValidatorError.InvalidBigInt
      })
      return z.NEVER
    }

    try {
      const parsed = pipe(BigInt, Number)(val)
      if (isNaN(parsed)) {
        return onError()
      }
      return parsed
    } catch (_err) {
      return onError()
    }
  })

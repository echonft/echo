import { pipe } from 'ramda'
import { string, z } from 'zod'

export const bigIntStringSchema = string().transform((val, ctx) => {
  const parsed = pipe(BigInt, Number)(val)
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a number'
    })
    return z.NEVER
  }
  return parsed
})

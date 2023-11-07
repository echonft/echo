import { z } from 'zod'

export const positiveIntegerStringSchema = z
  .string()
  .min(1)
  .transform((val, ctx) => {
    const parsed = parseInt(val, 10)
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a number'
      })
      return z.NEVER
    }
    if (!Number.isInteger(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a integer'
      })
      return z.NEVER
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Number is not greater than 0'
      })
      return z.NEVER
    }
    return parsed
  })

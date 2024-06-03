import { string, z } from 'zod'

export const intStringSchema = string().transform((val, ctx) => {
  const parsed = parseInt(val, 10)
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a number'
    })
    return z.NEVER
  }
  return parsed
})

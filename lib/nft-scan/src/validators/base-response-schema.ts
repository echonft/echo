import { number, object, string } from 'zod'

export const baseResponseSchema = object({
  code: number(),
  msg: string().nullable().optional()
})

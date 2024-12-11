import { number, object } from 'zod'

export const baseResponseSchema = object({
  count: number()
})

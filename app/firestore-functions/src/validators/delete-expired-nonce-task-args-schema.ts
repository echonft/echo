import { object, string } from 'zod'

export const deleteExpiredNonceTaskArgsSchema = object({
  id: string().min(1)
})

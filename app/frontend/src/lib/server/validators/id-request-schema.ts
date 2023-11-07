import { z } from 'zod'

export const idRequestSchema = z.object({
  id: z.string().min(1)
})

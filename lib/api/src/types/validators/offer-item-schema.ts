import { z } from 'zod'

export const offerItemSchema = z.object({
  amount: z.number().gte(0),
  id: z.string().nonempty()
})

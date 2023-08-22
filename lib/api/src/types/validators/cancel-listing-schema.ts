import { z } from 'zod'

export const cancelListingSchema = z.object({
  id: z.string().nonempty()
})

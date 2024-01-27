import { z } from 'zod'

export const listingTargetSchema = z.object({
  amount: z.number().gt(0),
  collection: z
    .object({
      slug: z.string().min(1)
    })
    .required()
})

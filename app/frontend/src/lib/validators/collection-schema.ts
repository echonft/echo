import { toLower } from 'ramda'
import { z } from 'zod'

export const collectionSchema = z.object({
  slug: z
    .string()
    .min(1)
    .transform(toLower<string>)
})

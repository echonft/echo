import { UpdateOfferAction } from '@echo/api'
import { z } from 'zod'

export const updateOfferRequestSchema = z.object({
  action: z.nativeEnum(UpdateOfferAction)
})

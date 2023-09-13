import { UpdateOfferAction } from '@echo/api/constants/update-offer-action'
import { z } from 'zod'

export const updateOfferRequestSchema = z.object({
  action: z.nativeEnum(UpdateOfferAction)
})

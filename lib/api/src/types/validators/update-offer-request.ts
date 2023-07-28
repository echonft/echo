import { idRequestSchema } from './id-request'
import { UpdateOfferAction } from '@echo/api-public'
import { z } from 'zod'

export const updateOfferRequestSchema = idRequestSchema.extend({
  action: z.nativeEnum(UpdateOfferAction)
})

import { UpdateOfferAction } from '../model/helper/update-offer-action'
import { idRequestSchema } from './id-request'
import { z } from 'zod'

export const updateOfferRequestSchema = idRequestSchema.extend({
  action: z.nativeEnum(UpdateOfferAction)
})

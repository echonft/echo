import { idRequestSchema } from './id-request-schema'
import { UpdateListingAction } from '@echo/api-public'
import { z } from 'zod'

export const updateListingRequestSchema = idRequestSchema.extend({
  action: z.nativeEnum(UpdateListingAction)
})

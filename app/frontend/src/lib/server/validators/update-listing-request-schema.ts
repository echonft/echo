import { UpdateListingAction } from '@echo/api'
import { z } from 'zod'

export const updateListingRequestSchema = z.object({
  action: z.nativeEnum(UpdateListingAction)
})

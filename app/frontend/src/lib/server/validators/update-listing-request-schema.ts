import { UpdateListingAction } from '@echo/api/constants/update-listing-action'
import { z } from 'zod'

export const updateListingRequestSchema = z.object({
  action: z.nativeEnum(UpdateListingAction)
})

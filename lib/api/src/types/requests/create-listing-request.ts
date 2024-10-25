import type { createListingRequestSchema } from '@echo/api/validators/create-listing-request-schema'
import { z } from 'zod'

export type CreateListingRequest = z.infer<typeof createListingRequestSchema>

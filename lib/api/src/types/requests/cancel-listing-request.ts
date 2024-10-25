import type { cancelListingRequestSchema } from '@echo/api/validators/cancel-listing-request-schema'
import { z } from 'zod'

export type CancelListingRequest = z.infer<typeof cancelListingRequestSchema>

import { listingDetailsSearchParamsSchema } from '@echo/routing/validators/frontend/listing/listing-details-search-params-schema'
import { z } from 'zod'

export type ListingDetailsSearchParams = z.infer<typeof listingDetailsSearchParamsSchema>

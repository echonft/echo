import type { listingSearchParamsSchema } from '@echo/routing/validators/frontend/listing/listing-search-params-schema'
import { z } from 'zod'

export type ListingSearchParams = z.infer<typeof listingSearchParamsSchema>

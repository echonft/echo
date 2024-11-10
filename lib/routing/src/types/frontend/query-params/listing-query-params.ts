import type { listingQueryParamsSchema } from '@echo/routing/validators/frontend/listing/listing-query-params-schema'
import { z } from 'zod'

export type ListingQueryParams = z.infer<typeof listingQueryParamsSchema>

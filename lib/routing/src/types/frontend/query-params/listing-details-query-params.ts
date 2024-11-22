import { listingDetailsQueryParamsSchema } from '@echo/routing/validators/frontend/listing/listing-details-query-params-schema'
import { z } from 'zod'

export type ListingDetailsQueryParams = z.infer<typeof listingDetailsQueryParamsSchema>

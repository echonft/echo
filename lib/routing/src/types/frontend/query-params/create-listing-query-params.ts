import type { createListingQueryParamsSchema } from '@echo/routing/validators/frontend/listing/create-listing-query-params-schema'
import { z } from 'zod'

export type CreateListingQueryParams = z.infer<typeof createListingQueryParamsSchema>

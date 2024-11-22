import type { createListingSearchParamsSchema } from '@echo/routing/validators/frontend/listing/create-listing-search-params-schema'
import { z } from 'zod'

export type CreateListingSearchParams = z.infer<typeof createListingSearchParamsSchema>

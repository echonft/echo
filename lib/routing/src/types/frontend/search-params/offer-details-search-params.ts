import type { offerDetailsSearchParamsSchema } from '@echo/routing/validators/frontend/offer/offer-details-search-params-schema'
import { z } from 'zod'

export type OfferDetailsSearchParams = z.infer<typeof offerDetailsSearchParamsSchema>

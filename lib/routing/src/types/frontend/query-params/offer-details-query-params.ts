import type { offerDetailsQueryParamsSchema } from '@echo/routing/validators/frontend/offer/offer-details-query-params-schema'
import { z } from 'zod'

export type OfferDetailsQueryParams = z.infer<typeof offerDetailsQueryParamsSchema>

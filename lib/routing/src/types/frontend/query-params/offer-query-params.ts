import type { offerQueryParamsSchema } from '@echo/routing/validators/frontend/offer/offer-query-params-schema'
import { z } from 'zod'

export type OfferQueryParams = z.infer<typeof offerQueryParamsSchema>

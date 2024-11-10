import type { offerSearchParamsSchema } from '@echo/routing/validators/frontend/offer/offer-search-params-schema'
import { z } from 'zod'

export type OfferSearchParams = z.infer<typeof offerSearchParamsSchema>

import type { createOfferSearchParamsSchema } from '@echo/routing/validators/frontend/offer/create-offer-search-params-schema'
import { z } from 'zod'

export type CreateOfferSearchParams = z.infer<typeof createOfferSearchParamsSchema>

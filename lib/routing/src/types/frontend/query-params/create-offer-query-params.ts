import type { createOfferQueryParamsSchema } from '@echo/routing/validators/frontend/offer/create-offer-query-params-schema'
import { z } from 'zod'

export type CreateOfferQueryParams = z.infer<typeof createOfferQueryParamsSchema>

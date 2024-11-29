import type { swapDetailsQueryParamsSchema } from '@echo/routing/validators/frontend/swap/swap-details-query-params-schema'
import { z } from 'zod'

export type SwapDetailsQueryParams = z.infer<typeof swapDetailsQueryParamsSchema>

import type { swapDetailsSearchParamsSchema } from '@echo/routing/validators/frontend/swap/swap-details-search-params-schema'
import { z } from 'zod'

export type SwapDetailsSearchParams = z.infer<typeof swapDetailsSearchParamsSchema>

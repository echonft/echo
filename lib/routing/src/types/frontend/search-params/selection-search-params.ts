import type { selectionSearchParamsSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-schema'
import { z } from 'zod'

export type SelectionSearchParams = z.infer<typeof selectionSearchParamsSchema>

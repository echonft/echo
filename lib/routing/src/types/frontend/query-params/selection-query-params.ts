import type { selectionQueryParamsSchema } from '@echo/routing/validators/frontend/selection/selection-query-params-schema'
import { z } from 'zod'

export type SelectionQueryParams = z.infer<typeof selectionQueryParamsSchema>

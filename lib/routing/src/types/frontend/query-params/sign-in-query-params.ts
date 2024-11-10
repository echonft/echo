import type { signInQueryParamsSchema } from '@echo/routing/validators/frontend/sign-in/sign-in-query-params-schema'
import { z } from 'zod'

export type SignInQueryParams = z.infer<typeof signInQueryParamsSchema>

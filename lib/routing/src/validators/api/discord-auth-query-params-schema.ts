import { FrontendRouteError } from '@echo/routing/constants/errors/frontend-route-error'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { object, string } from 'zod'

export const discordAuthQueryParamsSchema = object({
  callbackUrl: string()
    .url()
    .refine((url) => url.startsWith(baseUrl()), FrontendRouteError.CallbackUrlInvalid)
})

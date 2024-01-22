import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getUserRequestHandler } from '@echo/frontend/lib/request-handlers/user/get-user-request-handler'

export const GET = appRouteHandler(getUserRequestHandler)

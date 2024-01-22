import { adminAppRouteHandler } from '@echo/frontend/lib/request-handlers/admin-app-route-handler'
import { updateUserRequestHandler } from '@echo/frontend/lib/request-handlers/user/update-user-request-handler'

export const POST = adminAppRouteHandler(updateUserRequestHandler)

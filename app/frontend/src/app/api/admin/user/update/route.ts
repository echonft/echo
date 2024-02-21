import { adminRouteHandler } from '@echo/frontend/lib/request-handlers/admin-route-handler'
import { updateUserRequestHandler } from '@echo/frontend/lib/request-handlers/profile/update-user-request-handler'

export const POST = adminRouteHandler(updateUserRequestHandler)

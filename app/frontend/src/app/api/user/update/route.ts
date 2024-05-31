import { updateUserRequestHandler } from '@echo/frontend/lib/request-handlers/profile/update-user-request-handler'
import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'

export const POST = routeHandler(updateUserRequestHandler)

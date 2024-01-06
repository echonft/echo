import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { cancelListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/cancel-listing-request-handler'

export const POST = authAppRouteHandler(cancelListingRequestHandler)

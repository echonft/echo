import { authAppRouteHandler } from '@echo/frontend/lib/request-handlers/auth-app-route-handler'
import { cancelListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/cancel-listing-request-handler'

export const POST = authAppRouteHandler(cancelListingRequestHandler)

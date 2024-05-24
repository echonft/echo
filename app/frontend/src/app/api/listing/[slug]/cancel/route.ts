import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { cancelListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/cancel-listing-request-handler'

export const POST = authRouteHandler(cancelListingRequestHandler)

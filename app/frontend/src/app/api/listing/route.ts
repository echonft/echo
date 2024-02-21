import { authRouteHandler } from '@echo/frontend/lib/request-handlers/auth-route-handler'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'

export const PUT = authRouteHandler(createListingRequestHandler)

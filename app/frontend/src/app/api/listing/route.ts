import { authAppRouteHandler } from '@echo/frontend/lib/server/request-handlers/auth-app-route-handler'
import { createListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/create-listing-request-handler'

export const PUT = authAppRouteHandler(createListingRequestHandler)

import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/get-listing-request-handler'

export const GET = appRouteHandler(getListingRequestHandler)

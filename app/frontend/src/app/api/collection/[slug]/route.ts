import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getCollectionRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-collection-request-handler'

export const GET = appRouteHandler(getCollectionRequestHandler)

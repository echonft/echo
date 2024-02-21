import { getCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-collections-request-handler'
import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'

export const GET = routeHandler(getCollectionsRequestHandler)

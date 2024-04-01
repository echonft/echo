import { searchCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/search-collections-request-handler'
import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'

export const GET = routeHandler(searchCollectionsRequestHandler)

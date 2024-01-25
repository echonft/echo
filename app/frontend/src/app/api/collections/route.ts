import { appRouteHandler } from '@echo/frontend/lib/request-handlers/app-route-handler'
import { getCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/get-collections-request-handler'

export const GET = appRouteHandler(getCollectionsRequestHandler)

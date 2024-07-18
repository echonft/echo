import { searchCollectionsRequestHandler } from '@echo/frontend/lib/request-handlers/collection/search-collections-request-handler'
import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'

export const GET = requestHandler(searchCollectionsRequestHandler)

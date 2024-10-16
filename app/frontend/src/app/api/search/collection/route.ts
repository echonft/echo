import { searchCollectionsRequestHandler } from '@echo/backend/request-handlers/collection/search-collections-request-handler'
import { requestHandler } from '@echo/backend/request-handlers/request-handler'

export const GET = requestHandler(searchCollectionsRequestHandler)

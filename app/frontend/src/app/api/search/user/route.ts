import { routeHandler } from '@echo/frontend/lib/request-handlers/route-handler'
import { searchUsersRequestHandler } from '@echo/frontend/lib/request-handlers/user/search-users-request-handler'

export const GET = routeHandler(searchUsersRequestHandler)

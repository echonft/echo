import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'
import { searchUsersRequestHandler } from '@echo/frontend/lib/request-handlers/user/search-users-request-handler'

export const GET = requestHandler(searchUsersRequestHandler)

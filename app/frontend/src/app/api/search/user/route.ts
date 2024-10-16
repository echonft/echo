import { requestHandler } from '@echo/backend/request-handlers/request-handler'
import { searchUsersRequestHandler } from '@echo/backend/request-handlers/user/search-users-request-handler'

export const GET = requestHandler(searchUsersRequestHandler)

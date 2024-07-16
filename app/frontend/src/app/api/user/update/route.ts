import { updateUserRequestHandler } from '@echo/frontend/lib/request-handlers/profile/update-user-request-handler'
import { requestHandler } from '@echo/frontend/lib/request-handlers/request-handler'

export const POST = requestHandler(updateUserRequestHandler)

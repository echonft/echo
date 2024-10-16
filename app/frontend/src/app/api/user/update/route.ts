import { updateUserRequestHandler } from '@echo/backend/request-handlers/profile/update-user-request-handler'
import { requestHandler } from '@echo/backend/request-handlers/request-handler'

export const POST = requestHandler(updateUserRequestHandler)

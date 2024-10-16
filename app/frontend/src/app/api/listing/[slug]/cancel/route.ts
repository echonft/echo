import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { cancelListingRequestHandler } from '@echo/backend/request-handlers/listing/cancel-listing-request-handler'

export const POST = authRequestHandler(cancelListingRequestHandler)

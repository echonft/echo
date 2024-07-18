import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { cancelListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/cancel-listing-request-handler'

export const POST = authRequestHandler(cancelListingRequestHandler)

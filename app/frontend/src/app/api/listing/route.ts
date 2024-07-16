import { authRequestHandler } from '@echo/frontend/lib/request-handlers/auth-request-handler'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'

export const PUT = authRequestHandler(createListingRequestHandler)

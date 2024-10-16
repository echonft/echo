import { authRequestHandler } from '@echo/backend/request-handlers/auth-request-handler'
import { createListingRequestHandler } from '@echo/backend/request-handlers/listing/create-listing-request-handler'

export const PUT = authRequestHandler(createListingRequestHandler)

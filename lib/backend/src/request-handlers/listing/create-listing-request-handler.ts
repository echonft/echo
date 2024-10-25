import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { createListingRequestTransformSchema } from '@echo/backend/validators/create-listing-request-transform-schema'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { andThen, objOf, pipe, prop } from 'ramda'

export async function createListingRequestHandler({
  user: { username },
  req
}: AuthRequestHandlerArgs<CreateListingRequest>) {
  const schema = await createListingRequestTransformSchema(username)
  return pipe(
    parseRequest(schema),
    andThen(pipe(addListing, andThen(pipe(prop('data'), objOf('listing'), toNextReponse))))
  )(req)
}

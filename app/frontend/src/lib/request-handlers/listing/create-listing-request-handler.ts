import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { createListingSchema } from '@echo/frontend/lib/validators/create-listing-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { andThen, objOf, pipe, prop } from 'ramda'

export async function createListingRequestHandler({
  user: { username },
  req
}: AuthRequestHandlerArgs<CreateListingRequest>) {
  const { items: requestItems, target: requestTarget, expiresAt } = await parseRequest(createListingSchema)(req)
  const items = await getNftsFromIndexes(requestItems)
  const target = await getListingTargetFromRequest(requestTarget)
  for (const item of items) {
    if (item.owner.username !== username) {
      return Promise.reject(new ForbiddenError())
    }
  }
  return pipe(addListing, andThen(pipe(prop('data'), objOf('listing'), toNextReponse)))({ items, target, expiresAt })
}

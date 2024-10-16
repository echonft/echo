import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { AuthRequestHandlerArgs } from '@echo/backend/types/auth-request-handler'
import { createListingRequestSchema } from '@echo/backend/validators/create-listing-request-schema'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'

export async function createListingRequestHandler({
  // user: { username },
  req
}: AuthRequestHandlerArgs<CreateListingRequest>) {
  // TODO
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items: requestItems, target: requestTarget, expiration } = await parseRequest(createListingRequestSchema)(req)
  // const items = await getNftsFromIndexes(requestItems)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  // const target = await getListingTargetFromRequest(requestTarget)
  // for (const item of items) {
  //   if (item.owner?.username !== username) {
  //     return Promise.reject(new ForbiddenError())
  //   }
  // }
  // FIXME of course
  return toNextReponse({ listing: getListingMock() })
  // return pipe(
  //   addListing,
  //   andThen(pipe(prop('data'), objOf('listing'), toNextReponse))
  // )({ items: items as NonEmptyArray<OwnedNft>, target, expiration })
}

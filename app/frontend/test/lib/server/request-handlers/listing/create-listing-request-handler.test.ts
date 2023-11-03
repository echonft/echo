import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingItemRequest } from '@echo/api/types/requests/listing-item-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { getListingItems } from '@echo/frontend/lib/server/helpers/listing/get-listing-items'
import { getListingTargets } from '@echo/frontend/lib/server/helpers/listing/get-listing-targets'
import { guarded_addListing } from '@echo/frontend/lib/server/helpers/listing/guarded_add-listing'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { createListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, map, modify, pick, pipe, prop } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/listing/guarded_add-listing')
jest.mock('@echo/frontend/lib/server/helpers/listing/get-listing-targets')
jest.mock('@echo/frontend/lib/server/helpers/listing/get-listing-items')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const validRequest: CreateListingRequest = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    items: pipe(prop('items'), map(modify('nft', pick(['id']))))(listing) as NonEmptyArray<ListingItemRequest>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target: pipe(prop('targets'), head, modify('collection', pick(['id'])))(listing) as ListingTargetRequest
  }
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    try {
      await createListingRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the owner of every item', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(getListingItems)
      .mockResolvedValue([{ amount: 1, nft: { owner: { username: 'another-username' } as User } as Nft }])
    jest.mocked(getListingTargets).mockResolvedValue(listing.targets)
    jest.mocked(guarded_addListing).mockResolvedValue(listing)
    const req = mockRequest<CreateListingRequest>(validRequest)
    try {
      await createListingRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns 200 if the user owns all the items', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getListingItems).mockResolvedValue(listing.items)
    jest.mocked(getListingTargets).mockResolvedValue(listing.targets)
    jest.mocked(guarded_addListing).mockResolvedValue(listing)
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(req)
    expect(guarded_addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

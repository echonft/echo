import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { IdRequest } from '@echo/api/types/requests/id-request'
import type { ItemRequest } from '@echo/api/types/requests/item-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { getListingItemsFromRequests } from '@echo/frontend/lib/helpers/listing/get-listing-items-from-requests'
import { getListingTargetsFromRequests } from '@echo/frontend/lib/helpers/listing/get-listing-targets-from-requests'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { head, map, modify, pick, pipe, prop } from 'ramda'

jest.mock('@echo/firestore/crud/listing/add-listing')
jest.mock('@echo/frontend/lib/helpers/listing/get-listing-targets-from-requests')
jest.mock('@echo/frontend/lib/helpers/listing/get-listing-items-from-requests')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const validRequest: CreateListingRequest = {
    items: pipe<[Listing], ListingItem[], ItemRequest[]>(
      prop('items'),
      map(modify<'nft', Nft, IdRequest>('nft', pick(['id'])))
    )(listing),
    target: pipe<[Listing], ListingTarget[], ListingTarget, ListingTargetRequest>(
      prop('targets'),
      head,
      modify<'collection', Collection, { slug: string }>('collection', pick(['slug']))
    )(listing)
  }
  const user = getAuthUserMockByUsername('johnnycagewins')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    try {
      await createListingRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the owner of every item', async () => {
    jest
      .mocked(getListingItemsFromRequests)
      .mockResolvedValue([{ amount: 1, nft: { owner: { username: 'another-username' } as User } as Nft }])
    jest.mocked(getListingTargetsFromRequests).mockResolvedValue(listing.targets)
    jest.mocked(addListing).mockResolvedValue(listing)
    const req = mockRequest<CreateListingRequest>(validRequest)
    try {
      await createListingRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns 200 if the user owns all the items', async () => {
    jest.mocked(getListingItemsFromRequests).mockResolvedValue(listing.items)
    jest.mocked(getListingTargetsFromRequests).mockResolvedValue(listing.targets)
    jest.mocked(addListing).mockResolvedValue(listing)
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(user, req)
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

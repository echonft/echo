import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@echo/frontend/mocks/mock-request'
import { ONE_DAY } from '@echo/model/constants/expiration'
import { getListingItemsIndex } from '@echo/model/helpers/listing/get-listing-items-index'
import { getCollectionMockBySlug } from '@echo/model/mocks/collection/get-collection-mock-by-slug'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { getNftMockByIndex } from '@echo/model/mocks/nft/get-nft-mock-by-index'
import { nftMockSpiralCrewId } from '@echo/model/mocks/nft/nft-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { type Nft, type NftIndex } from '@echo/model/types/nft'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { toPromise } from '@echo/utils/fp/to-promise'
import { map, modify, pipe, prop } from 'ramda'

jest.mock('@echo/firestore/crud/listing/add-listing')
jest.mock('@echo/frontend/lib/helpers/nft/get-nfts-from-indexes')
jest.mock('@echo/frontend/lib/helpers/listing/get-listing-target-from-request')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById(listingMockId())
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeAll(() => {
    jest.mocked(getNftsFromIndexes).mockImplementation(pipe(map<NftIndex, Nft>(getNftMockByIndex), toPromise))
    jest
      .mocked(getListingTargetFromRequest)
      .mockImplementation(pipe(modify('collection', pipe(prop('slug'), getCollectionMockBySlug)), toPromise))
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    await expect(() => createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('throws if the user is not the owner of every item', async () => {
    const request: CreateListingRequest = {
      items: [getNftMockById(nftMockSpiralCrewId())],
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(prop('target'), mapListingTargetToRequest)(listing),
      expiration: ONE_DAY
    }
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing, listingOffers: [] })
    const req = mockRequest<CreateListingRequest>(request)
    await expect(() => createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns 200 if the user owns all the items', async () => {
    const validRequest: CreateListingRequest = {
      items: getListingItemsIndex(listing),
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(prop('target'), mapListingTargetToRequest)(listing),
      expiration: ONE_DAY
    }
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing, listingOffers: [] })
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler({ user, req })
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

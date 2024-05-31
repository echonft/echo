import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { getListingTargetFromRequest } from '@echo/frontend/lib/helpers/listing/get-listing-target-from-request'
import { getNftsFromIndexes } from '@echo/frontend/lib/helpers/nft/get-nfts-from-indexes'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { getListingItemsIndexes } from '@echo/model/helpers/listing/get-listing-items-indexes'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { getCollectionMockBySlug } from '@echo/model-mocks/collection/get-collection-mock-by-slug'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getNftMockByIndex } from '@echo/model-mocks/nft/get-nft-mock-by-index'
import { NFT_MOCK_SPIRAL_CREW_ID } from '@echo/model-mocks/nft/nft-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { toPromise } from '@echo/utils/fp/to-promise'
import { map, modify, pipe, prop } from 'ramda'

jest.mock('@echo/firestore/crud/listing/add-listing')
jest.mock('@echo/frontend/lib/helpers/nft/get-nfts-from-indexes')
jest.mock('@echo/frontend/lib/helpers/listing/get-listing-target-from-request')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById(LISTING_MOCK_ID)
  const user = getUserDocumentDataMockByUsername(USER_MOCK_JOHNNY_USERNAME)

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
    try {
      await createListingRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the owner of every item', async () => {
    const request: CreateListingRequest = {
      items: [getNftMockById(NFT_MOCK_SPIRAL_CREW_ID)],
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(prop('target'), mapListingTargetToRequest)(listing)
    }
    jest.mocked(addListing).mockResolvedValue({ id: LISTING_MOCK_ID, data: listing, listingOffers: [] })
    const req = mockRequest<CreateListingRequest>(request)
    try {
      await createListingRequestHandler(user, req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns 200 if the user owns all the items', async () => {
    const validRequest: CreateListingRequest = {
      items: getListingItemsIndexes(listing),
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(prop('target'), mapListingTargetToRequest)(listing)
    }
    jest.mocked(addListing).mockResolvedValue({ id: LISTING_MOCK_ID, data: listing, listingOffers: [] })
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(user, req)
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

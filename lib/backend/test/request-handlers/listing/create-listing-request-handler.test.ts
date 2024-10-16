import { describe, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/listing/add-listing')
jest.mock('../../../../../app/frontend/src/lib/helpers/nft/get-nfts-from-indexes')
jest.mock('@echo/api/helpers/listing/get-listing-target-from-request')

describe('request-handlers - listing - createListingRequestHandler', () => {
  // const listing = getListingMockById(listingMockId())
  // const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  // beforeAll(() => {
  //   jest.mocked(getNftsFromIndexes).mockImplementation(pipe(map<NftIndex, Nft>(getNftMockByIndex), toPromise))
  //   jest
  //     .mocked(getListingTargetFromRequest)
  //     .mockImplementation(pipe(modify('collection', pipe(prop('slug'), getCollectionMockBySlug)), toPromise))
  // })
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })
  //
  // it('throws if the request cannot be parsed', async () => {
  //   const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
  //   await expect(() => createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  // })
  //
  // it('throws if the user is not the owner of every item', async () => {
  //   const request: CreateListingRequest = {
  //     items: [getNftMockById(nftMockSpiralCrewId())],
  //     target: pipe<[Listing], Listing['target'], ListingTargetRequest>(
  //       prop('target'),
  //       mapListingTargetToRequest
  //     )(listing),
  //     expiration: Expiration.OneDay
  //   }
  //   jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing, listingOffers: [] })
  //   const req = mockRequest<CreateListingRequest>(request)
  //   await expect(() => createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(ForbiddenError)
  // })
  //
  // it('returns 200 if the user owns all the items', async () => {
  //   const validRequest: CreateListingRequest = {
  //     items: getListingItemsIndex(listing),
  //     target: pipe<[Listing], Listing['target'], ListingTargetRequest>(
  //       prop('target'),
  //       mapListingTargetToRequest
  //     )(listing),
  //     expiration: Expiration.OneDay
  //   }
  //   jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing, listingOffers: [] })
  //   const req = mockRequest<CreateListingRequest>(validRequest)
  //   const res = await createListingRequestHandler({ user, req })
  //   expect(addListing).toHaveBeenCalledTimes(1)
  //   expect(res.status).toBe(200)
  //   const responseData = (await res.json()) as ListingResponse
  //   expect(responseData).toEqual({ listing })
  // })
})

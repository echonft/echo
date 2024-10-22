import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { createListingRequestHandler } from '@echo/backend/request-handlers/listing/create-listing-request-handler'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingsForCreatorAndTarget } from '@echo/firestore/crud/listing/get-listings-for-creator-and-target'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { Expiration } from '@echo/model/constants/expiration'
import { listingItemsIndexes } from '@echo/model/helpers/listing/listing-items-indexes'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { erc721TokenIndex } from '@echo/model/helpers/token/erc721-token-index'
import { getCollectionMockBySlug } from '@echo/model/mocks/collection/get-collection-mock-by-slug'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { getNftMockByIndex } from '@echo/model/mocks/nft/get-nft-mock-by-index'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { NftIndex } from '@echo/model/types/nft/nft'
import { toPromise } from '@echo/utils/fp/to-promise'
import { getErc1155TokenBalance } from '@echo/web3/services/get-erc1155-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { find, map, modify, pipe, prop } from 'ramda'

jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/collection/get-collection')
jest.mock('@echo/web3/services/get-erc1155-token-balance')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/listing/get-listings-for-creator-and-target')
jest.mock('@echo/firestore/crud/listing/add-listing')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById(listingMockId())
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(user)
    jest.mocked(getListingsForCreatorAndTarget).mockResolvedValue([])
    jest
      .mocked(getNftByIndex)
      .mockImplementation((index: NftIndex) =>
        pipe(listingItemsIndexes, find(eqNft(index)), getNftMockByIndex, toPromise)(listing)
      )
    jest.mocked(getCollection).mockImplementation(pipe(getCollectionMockBySlug, toPromise))
    jest.mocked(getErc1155TokenBalance).mockResolvedValue(200)
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing })
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    await expect(createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns 200 if the user owns all the items', async () => {
    const validRequest: CreateListingRequest = {
      items: pipe<[Listing], Erc721Item[], CreateListingRequest['items']>(
        prop('items') as (listing: Listing) => Erc721Item[],
        map(modify('token', erc721TokenIndex))
      )(listing),
      target: {
        collection: {
          slug: listing.target.collection.slug
        },
        quantity: listing.target.quantity
      },
      expiration: Expiration.OneDay
    }
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listing })
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler({ user, req })
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

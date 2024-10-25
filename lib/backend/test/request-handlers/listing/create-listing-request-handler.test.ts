import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { createListingRequestHandler } from '@echo/backend/request-handlers/listing/create-listing-request-handler'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { listingMockId } from '@echo/firestore/mocks/db-model/listing-document-data-mock'
import { Expiration } from '@echo/model/constants/expiration'
import { listingItemsIndexes } from '@echo/model/helpers/listing/listing-items-indexes'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { erc721TokenIndex } from '@echo/model/helpers/token/erc721-token-index'
import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { getNftMockByIndex } from '@echo/model/mocks/nft/get-nft-mock-by-index'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Collection } from '@echo/model/types/collection'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { toPromise } from '@echo/utils/fp/to-promise'
import { getErc1155TokenBalance } from '@echo/web3/services/get-erc1155-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { find, modify, type NonEmptyArray, pipe, prop, propEq } from 'ramda'

jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/collection/get-collection')
jest.mock('@echo/web3/services/get-erc1155-token-balance')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/listing/get-listing-by-signature')
jest.mock('@echo/firestore/crud/listing/add-listing')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const user = userMockJohnny

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(user)
    jest.mocked(getListingBySignature).mockResolvedValue(undefined)
    jest
      .mocked(getNftByIndex)
      .mockImplementation((index: NftIndex) =>
        pipe(listingItemsIndexes, find(eqNft(index)), getNftMockByIndex, toPromise)(listingMock)
      )
    jest
      .mocked(getCollection)
      .mockImplementation((slug: Slug) => pipe(find<Collection>(propEq(slug, 'slug')), toPromise)(collectionMocks))
    jest.mocked(getErc1155TokenBalance).mockResolvedValue(200)
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listingMock })
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    await expect(createListingRequestHandler({ user, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns 200 if the user owns all the items', async () => {
    const validRequest: CreateListingRequest = {
      items: pipe<[Listing], NonEmptyArray<Erc721Item>, CreateListingRequest['items']>(
        prop('items') as (listing: Listing) => NonEmptyArray<Erc721Item>,
        nonEmptyMap(modify('token', erc721TokenIndex))
      )(listingMock),
      target: {
        collection: {
          slug: listingMock.target.collection.slug
        },
        quantity: listingMock.target.quantity
      },
      expiration: Expiration.OneDay
    }
    jest.mocked(addListing).mockResolvedValue({ id: listingMockId(), data: listingMock })
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler({ user, req })
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listingMock })
  })
})

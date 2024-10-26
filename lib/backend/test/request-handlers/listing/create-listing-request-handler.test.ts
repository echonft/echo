import { createListingRequestMock } from '@echo/api/mocks/create-listing-request-mock'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { createListingRequestHandler } from '@echo/backend/request-handlers/listing/create-listing-request-handler'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { toPromise } from '@echo/utils/fp/to-promise'
import { getTokenBalance } from '@echo/web3/services/get-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { find, pipe, propEq } from 'ramda'

jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/collection/get-collection')
jest.mock('@echo/web3/services/get-token-balance')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/listing/get-listing-by-signature')
jest.mock('@echo/firestore/crud/listing/add-listing')

describe('request-handlers - listing - createListingRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(userDocumentMockJohnny)
    jest.mocked(getListingBySignature).mockResolvedValue(undefined)
    jest
      .mocked(getNftByIndex)
      .mockImplementation((index: NftIndex) => pipe(find<NftDocument>(eqNft(index)), toPromise)(nftMocks))
    jest
      .mocked(getCollection)
      .mockImplementation((slug: Slug) => pipe(find<Collection>(propEq(slug, 'slug')), toPromise)(collectionMocks))
    jest.mocked(getTokenBalance).mockResolvedValue(200)
    jest.mocked(addListing).mockResolvedValue({ id: 'listing-id', data: listingDocumentMock })
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    await expect(createListingRequestHandler({ user: userMockJohnny, req })).rejects.toBeInstanceOf(BadRequestError)
  })

  it('returns 200 if the user owns all the items', async () => {
    jest.mocked(addListing).mockResolvedValue({ id: 'listing-id', data: listingDocumentMock })
    const req = mockRequest<CreateListingRequest>(createListingRequestMock)
    const res = await createListingRequestHandler({ user: userMockJohnny, req })
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = await res.json()
    expect(responseData).toEqual({ listing: listingMock })
  })
})

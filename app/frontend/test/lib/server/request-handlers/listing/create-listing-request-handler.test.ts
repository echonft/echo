import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { addListing } from '@echo/firestore/crud/listing/add-listing'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { createListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { type User } from '@echo/model/types/user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { assoc, map, modify, pick, pipe, prop, toLower } from 'ramda'

jest.mock('@echo/firestore/crud/listing/add-listing')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
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
    const wrongOwner: User = {
      discord: {
        username: 'crewnft_',
        avatarUrl: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png'
      },
      username: 'crewnft_',
      wallet: {
        address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'),
        chain: 'ethereum'
      }
    }
    const request: CreateListingRequest = {
      items: pipe<[Listing], Nft[], NftIndex[]>(
        prop('items'),
        map(pipe(assoc('owner', wrongOwner), mapNftToNftIndex))
      )(listing),
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(
        prop('target'),
        modify<'collection', Collection, { slug: string }>('collection', pick(['slug']))
      )(listing)
    }
    jest.mocked(addListing).mockResolvedValue(listing)
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
      items: pipe<[Listing], Nft[], NftIndex[]>(prop('items'), map(mapNftToNftIndex))(listing),
      target: pipe<[Listing], ListingTarget, ListingTargetRequest>(
        prop('target'),
        modify<'collection', Collection, { slug: string }>('collection', pick(['slug']))
      )(listing)
    }
    jest.mocked(addListing).mockResolvedValue(listing)
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(user, req)
    expect(addListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing })
  })
})

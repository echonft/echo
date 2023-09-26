import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { GetListingResponse } from '@echo/api/types/responses/get-listing-response'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { ApiError } from '@server/helpers/error/api-error'
import { createListing } from '@server/helpers/listing/create-listing'
import { getListingItems } from '@server/helpers/listing/get-listing-items'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { mapListingToResponse } from '@server/mappers/to-response/map-listing-to-response'
import { createListingRequestHandler } from '@server/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/listing/create-listing')
jest.mock('@server/helpers/listing/get-listing-targets')
jest.mock('@server/helpers/listing/get-listing-items')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const validRequest: CreateListingRequest = {
    items: [
      {
        amount: 1,
        nft: {
          id: 'item-nft-id'
        }
      }
    ],
    targets: [
      {
        amount: 1,
        collection: {
          id: 'target-collection-id'
        }
      }
    ]
  }
  const user: AuthUser = {
    id: 'user-id',
    name: 'user-name',
    image: 'user-image'
  }

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
    jest.mocked(getListingItems).mockResolvedValue([{ amount: 1, nft: { owner: { username: 'another-username' } } }])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getListingTargets).mockResolvedValue([])
    jest.mocked(createListing).mockResolvedValue(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
    const req = mockRequest<CreateListingRequest>(validRequest)
    try {
      await createListingRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns 200 if the user owns all the items', async () => {
    const mock = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getListingItems).mockResolvedValue([{ amount: 1, nft: { owner: { username: 'user-name' } } }])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getListingTargets).mockResolvedValue([])
    jest.mocked(createListing).mockResolvedValue(mock)
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(req)
    expect(createListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as GetListingResponse
    expect(responseData).toEqual({ listing: mapListingToResponse(mock) })
  })
})

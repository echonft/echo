import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { cancelListing } from '@echo/frontend/lib/server/helpers/listing/cancel-listing'
import { getListing } from '@echo/frontend/lib/server/helpers/listing/get-listing'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { cancelListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/cancel-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { assoc, modify } from 'ramda'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/listing/get-listing')
jest.mock('@echo/frontend/lib/server/helpers/listing/cancel-listing')

describe('request-handlers - listing - cancelListingRequestHandler', () => {
  const listingId = 'jUzMtPGKM62mMhEcmbN4'
  const listing = getListingMockById(listingId)
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(req, listingId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the listing state is not OPEN', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getListing).mockResolvedValueOnce(assoc('state', 'CANCELLED', listing))
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(req, listingId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the listing creator', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(getListing)
      .mockResolvedValueOnce(modify<Listing, 'creator', User>('creator', assoc('username', 'another-user'), listing))
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(req, listingId)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getListing).mockResolvedValueOnce(listing)
    const updatedListing = assoc('state', 'CANCELLED', listing)
    jest.mocked(cancelListing).mockResolvedValueOnce(updatedListing)
    const req = mockRequest<never>()
    const res = await cancelListingRequestHandler(req, listingId)
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing: updatedListing })
  })
})

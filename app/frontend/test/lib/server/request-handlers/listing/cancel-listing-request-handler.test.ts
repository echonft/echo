import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { cancelListing } from '@echo/frontend/lib/server/helpers/listing/cancel-listing'
import { getListing } from '@echo/frontend/lib/server/helpers/listing/get-listing'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { cancelListingRequestHandler } from '@echo/frontend/lib/server/request-handlers/listing/cancel-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/request-response'
import { type Listing } from '@echo/model/types/listing'

jest.mock('@echo/frontend/lib/server/helpers/request/get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/listing/get-listing')
jest.mock('@echo/frontend/lib/server/helpers/listing/cancel-listing')

describe('request-handlers - listing - cancelListingRequestHandler', () => {
  const listingId = 'listingId'
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
    jest.mocked(getListing).mockResolvedValueOnce({ id: listingId, expired: false, state: 'CANCELLED' } as Listing)
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
    jest.mocked(getListing).mockResolvedValueOnce({
      id: listingId,
      expired: false,
      state: 'OPEN',
      creator: { username: 'another-user-name' }
    } as Listing)
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
    jest.mocked(getListing).mockResolvedValueOnce({
      id: listingId,
      expired: false,
      state: 'OPEN',
      creator: { username: 'johnnycagewins' }
    } as Listing)
    jest.mocked(cancelListing).mockResolvedValueOnce()
    const req = mockRequest<never>()
    const res = await cancelListingRequestHandler(req, listingId)
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

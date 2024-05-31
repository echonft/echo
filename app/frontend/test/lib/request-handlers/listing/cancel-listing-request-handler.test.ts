import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { getUserDocumentDataMockByUsername } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-username'
import { ApiError } from '@echo/frontend/lib/helpers/error/api-error'
import { cancelListingRequestHandler } from '@echo/frontend/lib/request-handlers/listing/cancel-listing-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { LISTING_STATE_CANCELLED } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import type { User } from '@echo/model/types/user'
import { getListingMockBySlug } from '@echo/model-mocks/listing/get-listing-mock-by-slug'
import { LISTING_MOCK_SLUG } from '@echo/model-mocks/listing/listing-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/listing/get-listing')
jest.mock('@echo/firestore/crud/listing/cancel-listing')

describe('request-handlers - listing - cancelListingRequestHandler', () => {
  const slug = LISTING_MOCK_SLUG
  const listing = getListingMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(USER_MOCK_JOHNNY_USERNAME)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(user, req, { slug: 'not-found' })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the listing state is read only', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(assoc('readOnly', true, listing))
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the listing creator', async () => {
    jest
      .mocked(getListing)
      .mockResolvedValueOnce(modify<Listing, 'creator', User>('creator', assoc('username', 'another-user'), listing))
    const req = mockRequest<never>()
    try {
      await cancelListingRequestHandler(user, req, { slug })
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(listing)
    const updatedListing = assoc('state', LISTING_STATE_CANCELLED, listing)
    jest.mocked(cancelListing).mockResolvedValueOnce(updatedListing)
    const req = mockRequest<never>()
    const res = await cancelListingRequestHandler(user, req, { slug })
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing: updatedListing })
  })
})

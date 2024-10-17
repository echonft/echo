import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { cancelListingRequestHandler } from '@echo/backend/request-handlers/listing/cancel-listing-request-handler'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMockBySlug } from '@echo/model/mocks/listing/get-listing-mock-by-slug'
import { listingMockSlug } from '@echo/model/mocks/listing/listing-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { type Listing } from '@echo/model/types/listing/listing'
import type { User } from '@echo/model/types/user/user'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/listing/get-listing')
jest.mock('@echo/firestore/crud/listing/cancel-listing')

describe('request-handlers - listing - cancelListingRequestHandler', () => {
  const slug = listingMockSlug()
  const listing = getListingMockBySlug(slug)
  const user = getUserDocumentDataMockByUsername(userMockJohnnyUsername())

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    const req = mockRequest()
    await expect(() =>
      cancelListingRequestHandler({ user, req, params: { slug: 'not-found' } })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  it('throws if the listing state is read only', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(assoc('readOnly', true, listing))
    const req = mockRequest()
    await expect(() => cancelListingRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(
      ForbiddenError
    )
  })

  it('throws if the user is not the listing creator', async () => {
    jest
      .mocked(getListing)
      .mockResolvedValueOnce(modify<Listing, 'creator', User>('creator', assoc('username', 'another-user'), listing))
    const req = mockRequest()
    await expect(() => cancelListingRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(
      ForbiddenError
    )
  })

  it('returns a 200', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(listing)
    const updatedListing = assoc('state', ListingState.Cancelled, listing)
    jest.mocked(cancelListing).mockResolvedValueOnce(updatedListing)
    const req = mockRequest()
    const res = await cancelListingRequestHandler({ user, req, params: { slug } })
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as ListingResponse
    expect(responseData).toEqual({ listing: updatedListing })
  })
})

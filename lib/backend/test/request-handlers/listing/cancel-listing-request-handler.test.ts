import { mockRequest } from '@echo/auth/mocks/mock-request'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { cancelListingRequestHandler } from '@echo/backend/request-handlers/listing/cancel-listing-request-handler'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListing } from '@echo/firestore/crud/listing/get-listing'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { ListingState } from '@echo/model/constants/listing-state'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/listing/get-listing')
jest.mock('@echo/firestore/crud/listing/cancel-listing')

describe('request-handlers - listing - cancelListingRequestHandler', () => {
  const slug = listingDocumentMock.slug
  const user = userMockJohnny

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    const req = mockRequest()
    await expect(cancelListingRequestHandler({ user, req, params: { slug: 'not-found' } })).rejects.toBeInstanceOf(
      NotFoundError
    )
  })

  it('throws if the listing is locked', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(assoc('locked', true, listingDocumentMock))
    const req = mockRequest()
    await expect(cancelListingRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('throws if the user is not the listing creator', async () => {
    jest
      .mocked(getListing)
      .mockResolvedValueOnce(modify('creator', assoc('username', 'another-user'), listingDocumentMock))
    const req = mockRequest()
    await expect(cancelListingRequestHandler({ user, req, params: { slug } })).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns a 200', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(listingDocumentMock)
    const updatedListing = assoc('state', ListingState.Cancelled, listingDocumentMock)
    jest.mocked(cancelListing).mockResolvedValueOnce(updatedListing)
    const req = mockRequest()
    const res = await cancelListingRequestHandler({ user, req, params: { slug } })
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = await res.json()
    expect(responseData).toEqual({ listing: updatedListing })
  })
})

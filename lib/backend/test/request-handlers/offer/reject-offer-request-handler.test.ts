import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { mockRequest } from '@echo/backend/mocks/mock-request'
import { rejectOfferRequestHandler } from '@echo/backend/request-handlers/offer/reject-offer-request-handler'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { offerDocumentMockToJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('request-handlers - offer - rejectOfferRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getOffer).mockResolvedValue(offerDocumentMockToJohnnycage)
    jest.mocked(rejectOffer).mockResolvedValue(offerDocumentMockToJohnnycage)
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValue(undefined)
    const req = mockRequest()
    await expect(
      rejectOfferRequestHandler({ user: userMockJohnny, req, params: { slug: offerDocumentMockToJohnnycage.slug } })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  it('throws if the offer is locked', async () => {
    jest.mocked(getOffer).mockResolvedValue(assoc('locked', true, offerDocumentMockToJohnnycage))
    const req = mockRequest()
    await expect(
      rejectOfferRequestHandler({ user: userMockJohnny, req, params: { slug: offerDocumentMockToJohnnycage.slug } })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(getOffer)
      .mockResolvedValue(modify('receiver', assoc('username', 'another-user'), offerDocumentMockToJohnnycage))
    const req = mockRequest()
    await expect(
      rejectOfferRequestHandler({ user: userMockJohnny, req, params: { slug: offerDocumentMockToJohnnycage.slug } })
    ).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns a 200', async () => {
    jest.mocked(rejectOffer).mockResolvedValue(assoc('state', OfferState.Rejected, offerDocumentMockToJohnnycage))
    const req = mockRequest()
    const res = await rejectOfferRequestHandler({
      user: userMockJohnny,
      req,
      params: { slug: offerDocumentMockToJohnnycage.slug }
    })
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = await res.json<OfferResponse>()
    expect(responseData).toEqual({ offer: assoc('state', OfferState.Rejected, offerMockToJohnnycage) })
  })
})

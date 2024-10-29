import { mockRequest } from '@echo/auth/mocks/mock-request'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { NotFoundError } from '@echo/backend/errors/not-found-error'
import { getOfferByIdContractRequestHandler } from '@echo/backend/request-handlers/offer/get-offer-by-id-contract-request-handler'
import { getOfferByIdContract } from '@echo/firestore/crud/offer/get-offer-by-id-contract'
import { offerDocumentMockFromJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/offer/get-offer-by-id-contract')

describe('request-handlers - offer - getOfferByIdContractRequestHandler', () => {
  const sender = userMockJohnny
  const receiver = userMockCrew

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getOfferByIdContract).mockResolvedValue(offerDocumentMockFromJohnnycage)
  })

  it('throws if the offer is undefined', async () => {
    jest.mocked(getOfferByIdContract).mockResolvedValue(undefined)
    const req = mockRequest()
    await expect(
      getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0x' } })
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  it('throws if the user is not the sender nor the receiver', async () => {
    jest.mocked(getOfferByIdContract).mockResolvedValue({
      ...offerDocumentMockFromJohnnycage,
      sender: { ...offerDocumentMockFromJohnnycage.sender, username: 'other-user' },
      receiver: { ...offerDocumentMockFromJohnnycage.receiver, username: 'other-user' }
    })
    const req = mockRequest()
    await expect(
      getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
    ).rejects.toBeInstanceOf(ForbiddenError)
  })

  it('returns a 200 if the user is authenticated and user is sender', async () => {
    const req = mockRequest()
    const res = await getOfferByIdContractRequestHandler({ user: sender, req, params: { idContract: '0xtest' } })
    expect(res.status).toBe(200)
    const responseData = await res.json()
    expect(responseData).toEqual({ offer: offerMockFromJohnnycage })
  })

  it('returns a 200 if the user is authenticated and user is receiver', async () => {
    const req = mockRequest()
    const res = await getOfferByIdContractRequestHandler({ user: receiver, req, params: { idContract: '0xtest' } })
    expect(res.status).toBe(200)
    const responseData = await res.json()
    expect(responseData).toEqual({ offer: offerMockFromJohnnycage })
  })
})

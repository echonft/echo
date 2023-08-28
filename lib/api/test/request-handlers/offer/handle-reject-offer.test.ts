import { ApiError } from '../../../src'
import { getOffer } from '../../../src/helpers/offer/get-offer'
import { rejectOffer } from '../../../src/helpers/offer/reject-offer'
import { handleRejectOffer } from '../../../src/request-handlers/offer/handle-reject-offer'
import { mockRequestResponse } from '../../mocks/request-response'
import { EmptyResponse, UpdateOfferRequest } from '@echo/api-public'
import { Offer, User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/offer/get-offer')
jest.mock('../../../src/helpers/offer/reject-offer')

describe('request-handlers - offer - handleRejectOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as User, res)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'another-user-id' } } as Offer)
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as User, res)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'userId' } } as Offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce()
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    await handleRejectOffer('offerId', { id: 'userId' } as User, res)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
  })
})

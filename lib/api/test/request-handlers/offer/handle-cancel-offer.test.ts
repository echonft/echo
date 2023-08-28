import { ApiError } from '../../../src'
import { cancelOffer } from '../../../src/helpers/offer/cancel-offer'
import { getOffer } from '../../../src/helpers/offer/get-offer'
import { handleCancelOffer } from '../../../src/request-handlers/offer/handle-cancel-offer'
import { mockRequestResponse } from '../../mocks/request-response'
import { EmptyResponse, UpdateOfferRequest } from '@echo/api-public'
import { Offer, User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/offer/get-offer')
jest.mock('../../../src/helpers/offer/cancel-offer')

describe('request-handlers - offer - handleCancelOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    try {
      await handleCancelOffer('offerId', { id: 'userId' } as User, res)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ sender: { id: 'another-user-id' } } as Offer)
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    try {
      await handleCancelOffer('offerId', { id: 'userId' } as User, res)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer sender', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ sender: { id: 'userId' } } as Offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce()
    const { res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST')
    await handleCancelOffer('offerId', { id: 'userId' } as User, res)
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
  })
})

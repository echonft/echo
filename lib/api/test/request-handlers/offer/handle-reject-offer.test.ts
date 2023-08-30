import { ApiError } from '../../../src/helpers/error/api-error'
import { getOffer } from '../../../src/helpers/offer/get-offer'
import { rejectOffer } from '../../../src/helpers/offer/reject-offer'
import { handleRejectOffer } from '../../../src/request-handlers/offer/handle-reject-offer'
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
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'another-user-id' } } as Offer)
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'userId' } } as Offer)
    jest.mocked(rejectOffer).mockResolvedValueOnce()
    const res = await handleRejectOffer('offerId', { id: 'userId' } as User)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

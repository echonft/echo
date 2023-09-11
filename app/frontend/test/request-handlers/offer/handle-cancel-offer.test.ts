import { Offer, User } from '@echo/firestore-types'
import { ApiError } from '@server/helpers/error/api-error'
import { cancelOffer } from '@server/helpers/offer/cancel-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { handleCancelOffer } from '@server/request-handlers/offer/handle-cancel-offer'

jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/cancel-offer')

describe('request-handlers - offer - handleCancelOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    try {
      await handleCancelOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer sender', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ sender: { id: 'another-user-id' } } as Offer)
    try {
      await handleCancelOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer sender', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ sender: { id: 'userId' } } as Offer)
    jest.mocked(cancelOffer).mockResolvedValueOnce()
    const res = await handleCancelOffer('offerId', { id: 'userId' } as User)
    expect(cancelOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

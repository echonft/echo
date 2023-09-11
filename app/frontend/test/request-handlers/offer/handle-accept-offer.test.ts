import { Offer, User } from '@echo/firestore-types'
import { ApiError } from '@server/helpers/error/api-error'
import { acceptOffer } from '@server/helpers/offer/accept-offer'
import { getOffer } from '@server/helpers/offer/get-offer'
import { handleAcceptOffer } from '@server/request-handlers/offer/handle-accept-offer'

jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/accept-offer')

describe('request-handlers - offer - handleAcceptOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    try {
      await handleAcceptOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'another-user-id' } } as Offer)
    try {
      await handleAcceptOffer('offerId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'userId' } } as Offer)
    jest.mocked(acceptOffer).mockResolvedValueOnce()
    const res = await handleAcceptOffer('offerId', { id: 'userId' } as User)
    expect(acceptOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { ApiError } from '@server/helpers/error/api-error'
import { getOffer } from '@server/helpers/offer/get-offer'
import { rejectOffer } from '@server/helpers/offer/reject-offer'
import { handleRejectOffer } from '@server/request-handlers/offer/handle-reject-offer'

jest.mock('@server/helpers/offer/get-offer')
jest.mock('@server/helpers/offer/reject-offer')

describe('request-handlers - offer - handleRejectOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce(undefined)
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as FirestoreUser)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'another-user-id' } } as FirestoreOffer)
    try {
      await handleRejectOffer('offerId', { id: 'userId' } as FirestoreUser)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the offer receiver', async () => {
    jest.mocked(getOffer).mockResolvedValueOnce({ receiver: { id: 'userId' } } as FirestoreOffer)
    jest.mocked(rejectOffer).mockResolvedValueOnce()
    const res = await handleRejectOffer('offerId', { id: 'userId' } as FirestoreUser)
    expect(rejectOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

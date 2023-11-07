import { type CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { ApiError } from '@echo/frontend/lib/server/helpers/error/api-error'
import { guarded_addOffer } from '@echo/frontend/lib/server/helpers/offer/guarded_add-offer'
import { guarded_getOfferItemsFromRequests } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offer-items-from-requests'
import { guarded_getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request'
import { createOfferRequestHandler } from '@echo/frontend/lib/server/request-handlers/offer/create-offer-request-handler'
import { mockRequest } from '@echo/frontend-mocks/mock-request'
import { type Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'

jest.mock('@echo/frontend/lib/server/helpers/request/guarded_get-user-from-request')
jest.mock('@echo/frontend/lib/server/helpers/offer/guarded_add-offer')
jest.mock('@echo/frontend/lib/server/helpers/offer/guarded_get-offer-items-from-requests')

describe('request-handlers - offer - createOfferRequestHandler', () => {
  const validRequest: CreateOfferRequest = {
    receiverItems: [
      {
        amount: 1,
        nft: {
          id: 'receiver-item-nft-id'
        }
      }
    ],
    senderItems: [
      {
        amount: 1,
        nft: {
          id: 'sender-item-nft-id'
        }
      }
    ]
  }
  const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateOfferRequest>({} as CreateOfferRequest)
    try {
      await createOfferRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the sender is not the owner of every item (single)', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_getOfferItemsFromRequests).mockImplementation((offerItemRequests) => {
      if (offerItemRequests[0]!.nft.id === 'receiver-item-nft-id') {
        return Promise.resolve([{ amount: 1, nft: { owner: { username: 'crewnft_' } as User } as Nft }])
      } else {
        return Promise.resolve([{ amount: 1, nft: { owner: { username: 'another-user' } as User } as Nft }])
      }
    })
    jest.mocked(guarded_addOffer).mockResolvedValue(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
    const req = mockRequest<CreateOfferRequest>(validRequest)
    try {
      await createOfferRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the sender is not the owner of every item (multiple)', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_getOfferItemsFromRequests).mockImplementation((offerItemRequests) => {
      if (offerItemRequests[0]!.nft.id === 'receiver-item-nft-id') {
        return Promise.resolve([{ amount: 1, nft: { owner: { username: 'crewnft_' } as User } as Nft }])
      } else {
        return Promise.resolve([
          { amount: 1, nft: { owner: { username: 'johnnycagewins' } as User } as Nft },
          { amount: 1, nft: { owner: { username: 'another-user' } as User } as Nft }
        ])
      }
    })
    jest.mocked(guarded_addOffer).mockResolvedValue(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
    const req = mockRequest<CreateOfferRequest>(validRequest)
    try {
      await createOfferRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if the receiver is not the owner of every item (multiple)', async () => {
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(guarded_getOfferItemsFromRequests).mockImplementation((offerItemRequests) => {
      if (offerItemRequests[0]!.nft.id === 'receiver-item-nft-id') {
        return Promise.resolve([
          { amount: 1, nft: { owner: { username: 'crewnft_' } as User } as Nft },
          { amount: 1, nft: { owner: { username: 'another-user' } as User } as Nft }
        ])
      } else {
        return Promise.resolve([{ amount: 1, nft: { owner: { username: 'johnnycagewins' } as User } as Nft }])
      }
    })
    jest.mocked(guarded_addOffer).mockResolvedValue(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
    const req = mockRequest<CreateOfferRequest>(validRequest)
    try {
      await createOfferRequestHandler(req)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is authenticated and both sender and receiver have a wallet', async () => {
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    jest.mocked(guarded_getUserFromRequest).mockResolvedValueOnce(user)
    jest
      .mocked(guarded_getOfferItemsFromRequests)
      .mockResolvedValue([{ amount: 1, nft: { owner: { username: 'johnnycagewins' } as User } as Nft }])
    jest.mocked(guarded_addOffer).mockResolvedValue(offer)
    const req = mockRequest<CreateOfferRequest>(validRequest)
    const res = await createOfferRequestHandler(req)
    expect(guarded_addOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as OfferResponse
    expect(responseData).toEqual({ offer })
  })
})

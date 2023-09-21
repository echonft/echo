import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { IdResponse } from '@echo/api/types/responses/id-response'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { ApiError } from '@server/helpers/error/api-error'
import { createOffer } from '@server/helpers/offer/create-offer'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'
import { getUserFromRequest } from '@server/helpers/request/get-user-from-request'
import { mapOfferToResponse } from '@server/mappers/to-response/map-offer-to-response'
import { createOfferRequestHandler } from '@server/request-handlers/offer/create-offer-request-handler'
import { mockRequest } from '@server-mocks/request-response'

jest.mock('@server/helpers/request/get-user-from-request')
jest.mock('@server/helpers/offer/create-offer')
jest.mock('@server/helpers/offer/get-offer-items')

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
  const user: AuthUser = {
    id: 'user-id',
    name: 'user-name',
    image: 'user-image'
  }

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

  it('throws if the user is not the owner of every item', async () => {
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOfferItems).mockResolvedValue([{ amount: 1, nft: { owner: { username: 'another-username' } } }])
    jest.mocked(createOffer).mockResolvedValue(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'))
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
    jest.mocked(getUserFromRequest).mockResolvedValueOnce(user)
    jest.mocked(getOfferItems).mockResolvedValue([{ amount: 1, nft: { owner: { username: 'user-name' } } }])
    jest.mocked(createOffer).mockResolvedValue(offer)
    const req = mockRequest<CreateOfferRequest>(validRequest)
    const res = await createOfferRequestHandler(req)
    expect(createOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as IdResponse
    expect(responseData).toEqual({ offer: mapOfferToResponse(offer) })
  })
})

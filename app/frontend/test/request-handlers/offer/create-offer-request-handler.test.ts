import { getSession } from '../../../src/lib/server/helpers/auth/get-session'
import { ApiError } from '../../../src/lib/server/helpers/error/api-error'
import { createOffer } from '../../../src/lib/server/helpers/offer/create-offer'
import { getOfferItems } from '../../../src/lib/server/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../../src/lib/server/helpers/offer/get-offer-items-wallet'
import { findUserById } from '../../../src/lib/server/helpers/user/find-user-by-id'
import { createOfferRequestHandler } from '../../../src/lib/server/request-handlers/offer/create-offer-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { CreateOfferRequest, IdResponse } from '@echo/api'
import { User } from '@echo/firestore-types'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/lib/server/helpers/auth/get-session')
jest.mock('../../../src/lib/server/helpers/user/find-user-by-id')
jest.mock('../../../src/lib/server/helpers/offer/create-offer')
jest.mock('../../../src/lib/server/helpers/offer/get-offer-items')
jest.mock('../../../src/lib/server/helpers/offer/get-offer-items-wallet')

describe('request-handlers - offer - createOfferRequestHandler', () => {
  const validRequest: CreateOfferRequest = {
    receiverId: 'receiver-id',
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
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateOfferRequest>({} as CreateOfferRequest)
    try {
      await createOfferRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<CreateOfferRequest>(validRequest)
    try {
      await createOfferRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if user or receiver does not have any wallet', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId', wallets: [] } as unknown as User)
    const req = mockRequest<CreateOfferRequest>(validRequest)
    try {
      await createOfferRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if the user is authenticated and both sender and receiver have a wallet', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(findUserById).mockResolvedValue({
      id: 'userId',
      wallets: [{ chainId: 1, address: '0x12c63bbD266dB84e117356e664f3604055166CEc' }]
    } as unknown as User)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getOfferItems).mockResolvedValue([])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getOfferItemsWallet).mockResolvedValue([])
    jest.mocked(createOffer).mockResolvedValue('offerId')
    const req = mockRequest<CreateOfferRequest>(validRequest)
    const res = await createOfferRequestHandler(req, {} as AuthOptions)
    expect(createOffer).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as IdResponse
    expect(responseData).toEqual({ id: 'offerId' })
  })
})

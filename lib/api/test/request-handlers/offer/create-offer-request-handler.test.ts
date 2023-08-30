import { ApiError } from '../../../src/helpers/error/api-error'
import { createOffer } from '../../../src/helpers/offer/create-offer'
import { getOfferItems } from '../../../src/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../../src/helpers/offer/get-offer-items-wallet'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { createOfferRequestHandler } from '../../../src/request-handlers/offer/create-offer-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { CreateOfferRequest, IdResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/helpers/offer/create-offer')
jest.mock('../../../src/helpers/offer/get-offer-items')
jest.mock('../../../src/helpers/offer/get-offer-items-wallet')

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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, IdResponse>(
      'PUT',
      undefined,
      {} as CreateOfferRequest
    )
    try {
      await createOfferRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, IdResponse>('PUT', undefined, validRequest)
    try {
      await createOfferRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if user or receiver does not have any wallet', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId', wallets: [] } as unknown as User)
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, IdResponse>('PUT', undefined, validRequest)
    try {
      await createOfferRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns a 200 if request is POST, user is authenticated and both user and receiver have a wallet', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
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
    const { req, res } = mockRequestResponse<CreateOfferRequest, never, IdResponse>('PUT', undefined, validRequest)
    await createOfferRequestHandler(req, res, {} as AuthOptions)
    expect(createOffer).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ id: 'offerId' })
  })
})

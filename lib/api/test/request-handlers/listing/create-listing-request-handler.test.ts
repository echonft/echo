import { ApiError } from '../../../src/helpers/error/api-error'
import { createListing } from '../../../src/helpers/listing/create-listing'
import { getListingTargets } from '../../../src/helpers/listing/get-listing-targets'
import { getOfferItems } from '../../../src/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../../src/helpers/offer/get-offer-items-wallet'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { createListingRequestHandler } from '../../../src/request-handlers/listing/create-listing-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { CreateListingRequest, IdResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/helpers/listing/create-listing')
jest.mock('../../../src/helpers/listing/get-listing-targets')
jest.mock('../../../src/helpers/offer/get-offer-items')
jest.mock('../../../src/helpers/offer/get-offer-items-wallet')

describe('request-handlers - listing - createListingRequestHandler', () => {
  const validRequest: CreateListingRequest = {
    items: [
      {
        amount: 1,
        nft: {
          id: 'item-nft-id'
        }
      }
    ],
    targets: [
      {
        amount: 1,
        collection: {
          id: 'target-collection-id'
        }
      }
    ]
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<CreateListingRequest, never, IdResponse>(
      'PUT',
      undefined,
      {} as CreateListingRequest
    )
    try {
      await createListingRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<CreateListingRequest, never, IdResponse>('PUT', undefined, validRequest)
    try {
      await createListingRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if user does not have any wallet', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId', wallets: [] } as unknown as User)
    const { req, res } = mockRequestResponse<CreateListingRequest, never, IdResponse>('PUT', undefined, validRequest)
    try {
      await createListingRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns 200 if the user has a wallet', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({
      id: 'userId',
      wallets: [{ chainId: 1, address: '0x12c63bbD266dB84e117356e664f3604055166CEc' }]
    } as unknown as User)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getOfferItems).mockResolvedValue([])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getListingTargets).mockResolvedValue([])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getOfferItemsWallet).mockResolvedValue([])
    jest.mocked(createListing).mockResolvedValue('listingId')
    const { req, res } = mockRequestResponse<CreateListingRequest, never, IdResponse>('PUT', undefined, validRequest)
    await createListingRequestHandler(req, res, {} as AuthOptions)
    expect(createListing).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toStrictEqual({ id: 'listingId' })
  })
})

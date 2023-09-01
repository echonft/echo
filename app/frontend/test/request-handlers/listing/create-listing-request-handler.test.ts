import { getSession } from '../../../src/lib/server/helpers/auth/get-session'
import { ApiError } from '../../../src/lib/server/helpers/error/api-error'
import { createListing } from '../../../src/lib/server/helpers/listing/create-listing'
import { getListingTargets } from '../../../src/lib/server/helpers/listing/get-listing-targets'
import { getOfferItems } from '../../../src/lib/server/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../../src/lib/server/helpers/offer/get-offer-items-wallet'
import { findUserById } from '../../../src/lib/server/helpers/user/find-user-by-id'
import { createListingRequestHandler } from '../../../src/lib/server/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { CreateListingRequest, IdResponse } from '@echo/api-public'
import { User } from '@echo/firestore'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/lib/server/helpers/auth/get-session')
jest.mock('../../../src/lib/server/helpers/user/find-user-by-id')
jest.mock('../../../src/lib/server/helpers/listing/create-listing')
jest.mock('../../../src/lib/server/helpers/listing/get-listing-targets')
jest.mock('../../../src/lib/server/helpers/offer/get-offer-items')
jest.mock('../../../src/lib/server/helpers/offer/get-offer-items-wallet')

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
  const session = {
    user: {
      id: 'userId'
    }
  } as unknown as Session

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const req = mockRequest<CreateListingRequest>({} as CreateListingRequest)
    try {
      await createListingRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<CreateListingRequest>(validRequest)
    try {
      await createListingRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('throws if user does not have any wallet', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId', wallets: [] } as unknown as User)
    const req = mockRequest<CreateListingRequest>(validRequest)
    try {
      await createListingRequestHandler(req, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('returns 200 if the user has a wallet', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
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
    const req = mockRequest<CreateListingRequest>(validRequest)
    const res = await createListingRequestHandler(req, {} as AuthOptions)
    expect(createListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
    const responseData = (await res.json()) as IdResponse
    expect(responseData).toEqual({ id: 'listingId' })
  })
})

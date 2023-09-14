import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { IdResponse } from '@echo/api/types/responses/id-response'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { getSession } from '@server/helpers/auth/get-session'
import { ApiError } from '@server/helpers/error/api-error'
import { createListing } from '@server/helpers/listing/create-listing'
import { getListingTargets } from '@server/helpers/listing/get-listing-targets'
import { getOfferItems } from '@server/helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '@server/helpers/offer/get-offer-items-wallet'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { createListingRequestHandler } from '@server/request-handlers/listing/create-listing-request-handler'
import { mockRequest } from '@server-mocks/request-response'
import type { AuthOptions, Session } from 'next-auth'

jest.mock('@server/helpers/auth/get-session')
jest.mock('@server/helpers/user/get-user-by-id')
jest.mock('@server/helpers/listing/create-listing')
jest.mock('@server/helpers/listing/get-listing-targets')
jest.mock('@server/helpers/offer/get-offer-items')
jest.mock('@server/helpers/offer/get-offer-items-wallet')

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
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId', wallets: [] } as unknown as FirestoreUser)
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
    jest.mocked(getUserById).mockResolvedValueOnce({
      id: 'userId',
      wallets: [{ chainId: 1, address: '0x12c63bbD266dB84e117356e664f3604055166CEc' }]
    } as unknown as FirestoreUser)
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

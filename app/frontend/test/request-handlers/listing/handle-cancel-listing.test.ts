import { ApiError } from '../../../src/lib/server/helpers/error/api-error'
import { cancelListing } from '../../../src/lib/server/helpers/listing/cancel-listing'
import { getListing } from '../../../src/lib/server/helpers/listing/get-listing'
import { handleCancelListing } from '../../../src/lib/server/request-handlers/listing/handle-cancel-listing'
import { Listing, User } from '@echo/firestore-types'

jest.mock('../../../src/lib/server/helpers/listing/get-listing')
jest.mock('../../../src/lib/server/helpers/listing/cancel-listing')

describe('request-handlers - listing - handleCancelListing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the listing does not exist', async () => {
    jest.mocked(getListing).mockResolvedValueOnce(undefined)
    try {
      await handleCancelListing('listingId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if the user is not the listing creator', async () => {
    jest.mocked(getListing).mockResolvedValueOnce({ creator: { id: 'another-user-id' } } as Listing)
    try {
      await handleCancelListing('listingId', { id: 'userId' } as User)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('returns a 200 if the user is the listing creator', async () => {
    jest.mocked(getListing).mockResolvedValueOnce({ creator: { id: 'userId' } } as Listing)
    jest.mocked(cancelListing).mockResolvedValueOnce()
    const res = await handleCancelListing('listingId', { id: 'userId' } as User)
    expect(cancelListing).toHaveBeenCalledTimes(1)
    expect(res.status).toBe(200)
  })
})

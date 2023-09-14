import { UpdateListingAction } from '@echo/api/constants/update-listing-action'
import type { UpdateListingRequest } from '@echo/api/types/requests/update-listing-request'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { getSession } from '@server/helpers/auth/get-session'
import { ApiError } from '@server/helpers/error/api-error'
import { getUserById } from '@server/helpers/user/get-user-by-id'
import { handleCancelListing } from '@server/request-handlers/listing/handle-cancel-listing'
import { updateListingRequestHandler } from '@server/request-handlers/listing/update-listing-request-handler'
import { mockRequest } from '@server-mocks/request-response'
import type { AuthOptions, Session } from 'next-auth'

jest.mock('@server/helpers/auth/get-session')
jest.mock('@server/helpers/user/get-user-by-id')
jest.mock('@server/request-handlers/listing/handle-cancel-listing')

describe('request-handlers - listing - updateListingRequestHandler', () => {
  const id = 'listingId'
  const validRequest: UpdateListingRequest = {
    action: UpdateListingAction.CANCEL
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
    const req = mockRequest<UpdateListingRequest>({} as UpdateListingRequest)
    try {
      await updateListingRequestHandler(req, {} as AuthOptions, id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(null)
    const req = mockRequest<UpdateListingRequest>(validRequest)
    try {
      await updateListingRequestHandler(req, {} as AuthOptions, id)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('if authenticated and request action is CANCEL, handleCancelListing should be called', async () => {
    jest.mocked(getSession).mockResolvedValueOnce(session)
    jest.mocked(getUserById).mockResolvedValueOnce({ id: 'userId' } as FirestoreUser)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(handleCancelListing).mockResolvedValueOnce(undefined)
    const req = mockRequest<UpdateListingRequest>(validRequest)
    await updateListingRequestHandler(req, {} as AuthOptions, id)
    expect(handleCancelListing).toHaveBeenCalledTimes(1)
  })
})

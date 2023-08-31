import { getSession } from '../../../src/helpers/auth/get-session'
import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { handleCancelListing } from '../../../src/request-handlers/listing/handle-cancel-listing'
import { updateListingRequestHandler } from '../../../src/request-handlers/listing/update-listing-request-handler'
import { mockRequest } from '../../mocks/request-response'
import { UpdateListingAction, UpdateListingRequest } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, Session } from 'next-auth'

jest.mock('../../../src/helpers/auth/get-session')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/request-handlers/listing/handle-cancel-listing')

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
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(handleCancelListing).mockResolvedValueOnce(undefined)
    const req = mockRequest<UpdateListingRequest>(validRequest)
    await updateListingRequestHandler(req, {} as AuthOptions, id)
    expect(handleCancelListing).toHaveBeenCalledTimes(1)
  })
})

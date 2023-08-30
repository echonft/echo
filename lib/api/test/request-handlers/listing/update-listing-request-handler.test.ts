import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { handleCancelListing } from '../../../src/request-handlers/listing/handle-cancel-listing'
import { updateListingRequestHandler } from '../../../src/request-handlers/listing/update-listing-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { EmptyResponse, UpdateListingAction, UpdateListingRequest } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { AuthOptions, getServerSession } from 'next-auth'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/request-handlers/listing/handle-cancel-listing')

describe('request-handlers - listing - updateListingRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<UpdateListingRequest, never, EmptyResponse>(
      'POST',
      undefined,
      {} as UpdateListingRequest
    )
    try {
      await updateListingRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<UpdateListingRequest, never, EmptyResponse>('POST', undefined, {
      id: 'listingId',
      action: UpdateListingAction.CANCEL
    })
    try {
      await updateListingRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('if authenticated and request action is CANCEL, handleCancelListing should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleCancelListing).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<UpdateListingRequest, never, EmptyResponse>('POST', undefined, {
      id: 'listingId',
      action: UpdateListingAction.CANCEL
    })
    await updateListingRequestHandler(req, res, {} as AuthOptions)
    expect(handleCancelListing).toHaveBeenCalledTimes(1)
  })
})

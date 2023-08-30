import { ApiError } from '../../../src/helpers/error/api-error'
import { findUserById } from '../../../src/helpers/user/find-user-by-id'
import { handleAcceptOffer } from '../../../src/request-handlers/offer/handle-accept-offer'
import { handleCancelOffer } from '../../../src/request-handlers/offer/handle-cancel-offer'
import { handleRejectOffer } from '../../../src/request-handlers/offer/handle-reject-offer'
import { updateOfferRequestHandler } from '../../../src/request-handlers/offer/update-offer-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { EmptyResponse, UpdateOfferAction, UpdateOfferRequest } from '@echo/api-public'
import { User } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { HTTP_METHODS } from 'next/dist/server/web/http'
import { AuthOptions, getServerSession } from 'next-auth'
import { either, equals, reject } from 'ramda'

jest.mock('next-auth')
jest.mock('../../../src/helpers/user/find-user-by-id')
jest.mock('../../../src/request-handlers/offer/handle-accept-offer')
jest.mock('../../../src/request-handlers/offer/handle-cancel-offer')
jest.mock('../../../src/request-handlers/offer/handle-reject-offer')

describe('request-handlers - offer - updateOfferRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the request is not POST', async () => {
    const notAllowedMethods = reject(either(equals('POST'), equals('DELETE')))(HTTP_METHODS)
    for (const method of notAllowedMethods) {
      const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>(method)
      try {
        await updateOfferRequestHandler(req, res, {} as AuthOptions)
        expect(true).toBeFalsy()
      } catch (e) {
        expect((e as ApiError).status).toBe(405)
      }
    }
  })

  it('throws if the request cannot be parsed', async () => {
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>(
      'POST',
      undefined,
      {} as UpdateOfferRequest
    )
    try {
      await updateOfferRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(400)
    }
  })

  it('throws if not authenticated', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce(null)
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST', undefined, {
      id: 'offerId',
      action: UpdateOfferAction.ACCEPT
    })
    try {
      await updateOfferRequestHandler(req, res, {} as AuthOptions)
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as ApiError).status).toBe(403)
    }
  })

  it('if authenticated and request action is ACCEPT, handleAcceptOffer should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleAcceptOffer).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST', undefined, {
      id: 'offerId',
      action: UpdateOfferAction.ACCEPT
    })
    await updateOfferRequestHandler(req, res, {} as AuthOptions)
    expect(handleAcceptOffer).toHaveBeenCalledTimes(1)
  })

  it('if authenticated and request action is CANCEL, handleCancelOffer should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleCancelOffer).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST', undefined, {
      id: 'offerId',
      action: UpdateOfferAction.CANCEL
    })
    await updateOfferRequestHandler(req, res, {} as AuthOptions)
    expect(handleCancelOffer).toHaveBeenCalledTimes(1)
  })

  it('if authenticated and request action is REJECT, handleRejectOffer should be called', async () => {
    jest.mocked(getServerSession).mockResolvedValueOnce({
      user: {
        id: 'userId'
      }
    })
    jest.mocked(findUserById).mockResolvedValueOnce({ id: 'userId' } as User)
    jest.mocked(handleRejectOffer).mockResolvedValueOnce()
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, EmptyResponse>('POST', undefined, {
      id: 'offerId',
      action: UpdateOfferAction.REJECT
    })
    await updateOfferRequestHandler(req, res, {} as AuthOptions)
    expect(handleRejectOffer).toHaveBeenCalledTimes(1)
  })
})

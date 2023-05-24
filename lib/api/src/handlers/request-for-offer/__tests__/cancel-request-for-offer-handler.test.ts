/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapRequestForOfferToResponse } from '../../../mappers/map-request-for-offer-to-response'
import { RequestForOfferResponse } from '../../../types'
import { RequestForOfferRequest } from '../../../types/model/requests/request-for-offer-request'
import { mockRequestResponse } from '../../../utils/test/mocks/request-response'
import { mockSession } from '../../../utils/test/mocks/session'
import { cancelRequestForOfferHandler } from '../cancel-request-for-offer-handler'
import { findRequestForOfferById, updateRequestForOfferActivities } from '@echo/firebase-admin'
import * as model from '@echo/model'
import { generateRequestForOfferActivity, RequestForOfferState, requestsForOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')

describe('handlers - user - cancelRequestForOfferHandler', () => {
  const requestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  const mockedFindRequestForOfferById = jest
    .mocked(findRequestForOfferById)
    .mockResolvedValue(R.fromNullable(requestForOffer, new Error()))
  const mockedUpdateRequestForOfferActivities = jest
    .mocked(updateRequestForOfferActivities)
    // @ts-ignore
    .mockResolvedValue(undefined)
  const mockedCanAddRequestForOfferActivity = jest.spyOn(model, 'canAddRequestForOfferActivity').mockReturnValue(true)
  const session = mockSession
  const mockedRequest: RequestForOfferRequest = {
    id: 'jUzMtPGKM62mMhEcmbN4'
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>('GET')
    await cancelRequestForOfferHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if session with no user, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await cancelRequestForOfferHandler(req, res, omit(['user'], session))
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
  })
  it('if session body is invalid, returns 400', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if findRequestForOfferById throws, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedFindRequestForOfferById.mockRejectedValueOnce(new Error())
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid listing id' })
  })
  it('if findRequestForOfferById returns an error, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedFindRequestForOfferById.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid listing id' })
  })
  it('if user is not sender of request for offer, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await cancelRequestForOfferHandler(req, res, { ...session, user: { ...session.user, id: 'test' } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot cancel listing' })
  })
  it('if request for offer cannot be cancelled, returns 401', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedCanAddRequestForOfferActivity.mockReturnValueOnce(false)
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot cancel listing' })
  })
  it('if updating listings returns an error, return 500', async () => {
    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    mockedUpdateRequestForOfferActivities.mockRejectedValueOnce(new Error())
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not cancel listing' })
  })
  it('if updating listing works, return 200', async () => {
    const cancelledActivity = generateRequestForOfferActivity(
      RequestForOfferState.CANCELLED,
      RequestForOfferState.EXPIRED
    )
    const expected = mapRequestForOfferToResponse({
      ...requestForOffer,
      state: RequestForOfferState.CANCELLED,
      activities: requestForOffer.activities.concat(cancelledActivity)
    })

    const { req, res } = mockRequestResponse<RequestForOfferRequest, never, RequestForOfferResponse>(
      'GET',
      undefined,
      mockedRequest
    )
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(expected)
  })
})

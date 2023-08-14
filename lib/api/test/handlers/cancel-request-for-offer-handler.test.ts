/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cancelRequestForOfferHandler } from '../../src/handlers/request-for-offer/cancel-request-for-offer-handler'
import { mapActivityToFirestoreData } from '../../src/mappers/activity/map-activity-to-firestore-data'
import { mockFindRequestForOfferById } from '../mocks/firestore/find-request-for-offer-by-id'
import { mockUpdateRequestForOfferActivities } from '../mocks/firestore/update-request-for-offer-activities'
import { requestForOfferFirestoreData } from '../mocks/request-for-offer-firestore-data'
import { mockRequestResponse } from '../mocks/request-response'
import { mockSession } from '../mocks/session'
import { IdRequest, RequestForOfferResponse } from '@echo/api-public'
import {
  canAddRequestForOfferActivity,
  findRequestForOfferById,
  generateRequestForOfferActivity,
  updateRequestForOfferActivities
} from '@echo/firestore'
import { RequestForOfferState } from '@echo/ui'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import dayjs from 'dayjs'
import { omit } from 'ramda'

jest.mock('@echo/firestore')

describe('handlers - user - cancelRequestForOfferHandler', () => {
  const session = mockSession
  const mockedRequest: IdRequest = {
    id: 'jUzMtPGKM62mMhEcmbN4'
  }
  const mockedCanAddRequestForOfferActivity = jest.mocked(canAddRequestForOfferActivity).mockReturnValue(true)
  const mockedUpdateRequestForOfferActivities = jest
    .mocked(updateRequestForOfferActivities)
    .mockImplementation(mockUpdateRequestForOfferActivities)

  jest.mocked(findRequestForOfferById).mockImplementation(mockFindRequestForOfferById)
  jest
    .mocked(generateRequestForOfferActivity)
    .mockReturnValue({ toState: 'CANCELLED', fromState: 'EXPIRED', date: dayjs() })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET')
    await cancelRequestForOfferHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if session with no user, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await cancelRequestForOfferHandler(req, res, omit(['user'], session))
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'User not found' })
  })
  it('if body is invalid, returns 400', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET')
    // @ts-ignore
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if findRequestForOfferById throws, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, {
      id: 'throw'
    })

    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if findRequestForOfferById rejects, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, {
      id: 'reject'
    })

    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid listing id' })
  })
  it('if findRequestForOfferById returns an error, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, {
      id: 'invalid'
    })
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid listing id' })
  })
  it('if user is not sender of request for offer, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, mockedRequest)
    await cancelRequestForOfferHandler(req, res, { ...session, user: { ...session.user, id: 'test' } })
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot cancel listing' })
  })
  it('if request for offer cannot be cancelled, returns 401', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, mockedRequest)
    mockedCanAddRequestForOfferActivity.mockReturnValueOnce(false)
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot cancel listing' })
  })
  it('if updating listings returns an error, return 500', async () => {
    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, mockedRequest)
    mockedUpdateRequestForOfferActivities.mockRejectedValueOnce(new Error('test'))
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not cancel listing' })
  })
  it('if updating listing works, return 200', async () => {
    const requestForOffer = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    const cancelledActivity = mapActivityToFirestoreData(
      generateRequestForOfferActivity(RequestForOfferState.CANCELLED, RequestForOfferState.EXPIRED)
    )
    const expected = {
      ...requestForOffer,
      state: RequestForOfferState.CANCELLED,
      activities: requestForOffer.activities.concat(cancelledActivity)
    }

    const { req, res } = mockRequestResponse<IdRequest, never, RequestForOfferResponse>('GET', undefined, mockedRequest)
    await cancelRequestForOfferHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(expected)
  })
})

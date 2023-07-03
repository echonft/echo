/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cancelRequestForOfferHandler } from '../../src/handlers/request-for-offer/cancel-request-for-offer-handler'
import { mapActivityToFirestoreData } from '../../src/mappers/map-activity-to-firestore-data'
import { RequestForOfferResponse } from '../../src/types'
import { IdRequest } from '../../src/types/model/requests/id-request'
import { mockFindRequestForOfferById } from '../../src/utils/test/mocks/firebase-admin/find-request-for-offer-by-id'
import { mockUpdateRequestForOfferActivities } from '../../src/utils/test/mocks/firebase-admin/update-request-for-offer-activities'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { mockSession } from '../../src/utils/test/mocks/session'
import { findRequestForOfferById, updateRequestForOfferActivities } from '@echo/firebase-admin'
import { requestForOfferFirestoreData } from '@echo/firestore'
import * as model from '@echo/model'
import { generateRequestForOfferActivity, RequestForOfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')

describe('handlers - user - cancelRequestForOfferHandler', () => {
  const mockedCanAddRequestForOfferActivity = jest.spyOn(model, 'canAddRequestForOfferActivity').mockReturnValue(true)
  const session = mockSession
  const mockedRequest: IdRequest = {
    id: 'jUzMtPGKM62mMhEcmbN4'
  }

  const mockedUpdateRequestForOfferActivities = jest
    .mocked(updateRequestForOfferActivities)
    .mockImplementation(mockUpdateRequestForOfferActivities)

  jest.mocked(findRequestForOfferById).mockImplementation(mockFindRequestForOfferById)
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
    mockedUpdateRequestForOfferActivities.mockRejectedValueOnce(new Error())
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

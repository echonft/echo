/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapActivityToFirestoreData } from '../../src/mappers/activity/map-activity-to-firestore-data'
import { updateOfferState } from '../../src/utils/handler/update-offer-state'
import { mockFindOfferById } from '../mocks/firestore/find-offer-by-id'
import { mockUpdateOfferActivities } from '../mocks/firestore/update-offer-activities'
import { mockUpdateRequestForOfferActivities } from '../mocks/firestore/update-request-for-offer-activities'
import { offerFirestoreData } from '../mocks/offer-firestore-data'
import { requestForOfferFirestoreData } from '../mocks/request-for-offer-firestore-data'
import { mockRequestResponse } from '../mocks/request-response'
import { userFirestoreData } from '../mocks/user-firestore-data'
import { UpdateOfferRequest } from '@echo/api-public'
import {
  canAddOfferActivity,
  canAddRequestForOfferActivity,
  findOfferById,
  findRequestForOfferByOfferId,
  FirestoreOfferData,
  generateOfferActivity,
  updateOfferActivities,
  updateRequestForOfferActivities
} from '@echo/firestore'
import { OfferState } from '@echo/ui'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import dayjs from 'dayjs'
import { omit } from 'ramda'

jest.mock('@echo/firestore')
jest.mock('../../src/mappers/activity/map-activity-to-firestore-data')

describe('utils - handler - updateOfferState', () => {
  const mockedUpdateOfferActivities = jest.mocked(updateOfferActivities).mockImplementation(mockUpdateOfferActivities)
  const mockedFindRequestForOfferByOfferId = jest
    .mocked(findRequestForOfferByOfferId)
    // @ts-ignore
    .mockResolvedValue(requestForOfferFirestoreData['open']!)
  const mockedUpdateRequestForOfferActivities = jest
    .mocked(updateRequestForOfferActivities)
    .mockImplementation(mockUpdateRequestForOfferActivities)
  const mockedCanAddOfferActivity = jest.mocked(canAddOfferActivity).mockReturnValue(true)
  const mockedCanAddRequestForOfferActivity = jest.mocked(canAddRequestForOfferActivity).mockReturnValue(true)
  jest
    .mocked(mapActivityToFirestoreData)
    .mockReturnValue({ date: dayjs().unix(), toState: 'ACCEPTED', fromState: 'OPEN' })
  jest.mocked(findOfferById).mockImplementation(mockFindOfferById)
  jest.mocked(generateOfferActivity).mockReturnValue({ date: dayjs(), toState: 'ACCEPTED', fromState: 'OPEN' })

  const mockId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const mockState = OfferState.ACCEPTED
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if findOfferById fails, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('not found', mockUser, mockState, true, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid offer id' })
  })
  it('if user is not sender, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('open', { ...mockUser, id: 'wrong' }, mockState, true, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if user is not receiver, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('open', { ...mockUser, id: 'wrong' }, mockState, false, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if findRequestForOfferByOfferId fails, returns 500', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedFindRequestForOfferByOfferId.mockRejectedValueOnce(new Error())
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not update offer' })
  })
  it('if canAddOfferActivity returns false, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedCanAddOfferActivity.mockReturnValueOnce(false)
    await updateOfferState(mockId, mockUser, mockState, true, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if checkRequestForOfferStatus throws, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedCanAddRequestForOfferActivity.mockReturnValueOnce(false)
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if updateOfferActivities fails, returns 500', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedUpdateOfferActivities.mockRejectedValueOnce(new Error())
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not update offer' })
  })
  it('if updateRequestForOfferActivities fails, returns 200', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedUpdateRequestForOfferActivities.mockRejectedValueOnce(new Error())
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(200)
    const newOffer = res._getJSONData() as FirestoreOfferData
    expect(omit(['activities', 'state'], newOffer)).toEqual(omit(['activities', 'state'], offerFirestoreData['open']))
    expect(newOffer.activities).toHaveLength(2)
    expect(newOffer.state).toBe(OfferState.ACCEPTED)
    expect(newOffer.activities[1]!.fromState).toBe(OfferState.OPEN)
    expect(newOffer.activities[1]!.toState).toBe(OfferState.ACCEPTED)
  })
  it('if offer can be updated (with request for offer), returns 200', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(200)
    const newOffer = res._getJSONData() as FirestoreOfferData
    expect(omit(['activities', 'state'], newOffer)).toEqual(omit(['activities', 'state'], offerFirestoreData['open']))
    expect(newOffer.activities).toHaveLength(2)
    expect(newOffer.state).toBe(OfferState.ACCEPTED)
    expect(newOffer.activities[1]!.fromState).toBe(OfferState.OPEN)
    expect(newOffer.activities[1]!.toState).toBe(OfferState.ACCEPTED)
  })
  it('if offer can be updated (no request for offer), returns 200', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    // @ts-ignore
    mockedFindRequestForOfferByOfferId.mockResolvedValueOnce(undefined)
    await updateOfferState('open', mockUser, mockState, false, res)
    expect(res.statusCode).toBe(200)
    const newOffer = res._getJSONData() as FirestoreOfferData
    expect(omit(['activities', 'state'], newOffer)).toEqual(omit(['activities', 'state'], offerFirestoreData['open']))
    expect(newOffer.activities).toHaveLength(2)
    expect(newOffer.state).toBe(OfferState.ACCEPTED)
    expect(newOffer.activities[1]!.fromState).toBe(OfferState.OPEN)
    expect(newOffer.activities[1]!.toState).toBe(OfferState.ACCEPTED)
  })
})

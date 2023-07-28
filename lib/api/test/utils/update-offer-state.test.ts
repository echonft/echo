import { mockFindOfferById } from '../../src/mocks/firebase-admin/find-offer-by-id'
import { mockUpdateOfferActivities } from '../../src/mocks/firebase-admin/update-offer-activities'
import { mockUpdateRequestForOfferActivities } from '../../src/mocks/firebase-admin/update-request-for-offer-activities'
import { updateOfferState } from '../../src/utils/handler/update-offer-state'
import { mockRequestResponse, UpdateOfferRequest } from '@echo/api-public'
import {
  findOfferById,
  findRequestForOfferByOfferId,
  updateOfferActivities,
  updateRequestForOfferActivities
} from '@echo/firebase-admin'
import {
  FirestoreOfferData,
  offerFirestoreData,
  requestForOfferFirestoreData,
  userFirestoreData
} from '@echo/firestore'
import { OfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'
import { omit } from 'ramda'

jest.mock('@echo/firebase-admin')

describe('utils - handler - createOfferFromData', () => {
  const mockedUpdateOfferActivities = jest.mocked(updateOfferActivities).mockImplementation(mockUpdateOfferActivities)
  const mockedFindRequestForOfferByOfferId = jest
    .mocked(findRequestForOfferByOfferId)
    .mockResolvedValue(R.fromNullable(undefined, new Error()))
  const mockedUpdateRequestForOfferActivities = jest
    .mocked(updateRequestForOfferActivities)
    .mockImplementation(mockUpdateRequestForOfferActivities)
  jest.mocked(findOfferById).mockImplementation(mockFindOfferById)

  const mockId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const mockUser = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const mockState = OfferState.ACCEPTED
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if findOfferById rejects, returns 500', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('reject', mockUser, mockState, true, res)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Could not update offer' })
  })
  it('if findOfferById fails, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState('not found', mockUser, mockState, true, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Invalid offer id' })
  })
  it('if user is not sender, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState(mockId, { ...mockUser, id: 'not sender' }, mockState, true, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if user is not receiver, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState(mockId, { ...mockUser, id: 'not receiver' }, mockState, false, res)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'Cannot update offer' })
  })
  it('if offer cannot be updated, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferState(mockId, mockUser, mockState, false, res)
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
  it('if checkRequestForOfferStatus throws, returns 401', async () => {
    const { res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    mockedFindRequestForOfferByOfferId.mockResolvedValueOnce(
      R.fromNullable(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4'], new Error())
    )
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
    mockedFindRequestForOfferByOfferId.mockResolvedValueOnce(
      R.fromNullable(requestForOfferFirestoreData['open'], new Error())
    )
    mockedUpdateRequestForOfferActivities.mockRejectedValueOnce(R.fromNullable(undefined, new Error()))
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
    mockedFindRequestForOfferByOfferId.mockResolvedValueOnce(
      R.fromNullable(requestForOfferFirestoreData['open'], new Error())
    )
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

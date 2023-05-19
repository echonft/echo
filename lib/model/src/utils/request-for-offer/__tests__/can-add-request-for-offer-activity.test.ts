import { requestsForOffer } from '../../../mocks/request-for-offer'
import { RequestForOfferActivity } from '../../../types/request-for-offer-activity'
import { RequestForOfferState } from '../../../types/request-for-offer-state'
import { canAddRequestForOfferActivity } from '../can-add-request-for-offer-activity'
import { generateRequestForOfferActivity } from '../generate-request-for-offer-activity'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canAddRequestForOfferActivity', () => {
  const mock = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  const notExpiredMock = { ...mock, expiresAt: dayjs().add(1, 'month') }
  const mockActivity = generateRequestForOfferActivity(
    RequestForOfferState.OFFER_RECEIVED,
    RequestForOfferState.CREATED
  )
  test('returns false if new activity is not using the proper from state', () => {
    let activity: RequestForOfferActivity = { ...mockActivity, fromState: undefined }
    expect(canAddRequestForOfferActivity(notExpiredMock, activity)).toBeFalsy()
    activity = { ...mockActivity, fromState: RequestForOfferState.OFFER_RECEIVED }
    expect(canAddRequestForOfferActivity(notExpiredMock, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is expired (by date)', () => {
    expect(canAddRequestForOfferActivity(mock, mockActivity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is expired (by state)', () => {
    const expiredMock = { ...notExpiredMock, state: RequestForOfferState.EXPIRED }
    expect(canAddRequestForOfferActivity(expiredMock, mockActivity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is cancelled', () => {
    const cancelledMock = { ...notExpiredMock, state: RequestForOfferState.CANCELLED }
    const activity = { ...mockActivity, fromState: RequestForOfferState.CANCELLED }
    expect(canAddRequestForOfferActivity(cancelledMock, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is fulfilled', () => {
    const fulfilledMock = { ...notExpiredMock, state: RequestForOfferState.FULFILLED }
    const activity = { ...mockActivity, fromState: RequestForOfferState.FULFILLED }
    expect(canAddRequestForOfferActivity(fulfilledMock, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer received and new activity is created', () => {
    const offerReceivedMock = { ...notExpiredMock, state: RequestForOfferState.OFFER_RECEIVED }
    const activity = {
      ...mockActivity,
      fromState: RequestForOfferState.OFFER_RECEIVED,
      toState: RequestForOfferState.CREATED
    }
    expect(canAddRequestForOfferActivity(offerReceivedMock, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer partially fulfilled and new activity is created', () => {
    const partiallyFulfilledMock = { ...notExpiredMock, state: RequestForOfferState.PARTIALLY_FULFILLED }
    const activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.CREATED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer created and new activity is not offer received, expired or cancelled', () => {
    const createdMock = { ...notExpiredMock, state: RequestForOfferState.CREATED }
    let activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.CREATED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeFalsy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.FULFILLED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeFalsy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.PARTIALLY_FULFILLED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeFalsy()
  })
  test('returns true if RequestForOffer is created and next state is valid', () => {
    const createdMock = { ...notExpiredMock, state: RequestForOfferState.CREATED }
    let activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.OFFER_RECEIVED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.EXPIRED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.CANCELLED
    }
    expect(canAddRequestForOfferActivity(createdMock, activity)).toBeTruthy()
  })
  test('returns true if RequestForOffer is offer received and next state is valid', () => {
    const offerReceivedMock = { ...notExpiredMock, state: RequestForOfferState.OFFER_RECEIVED }
    let activity = {
      ...mockActivity,
      fromState: RequestForOfferState.OFFER_RECEIVED,
      toState: RequestForOfferState.PARTIALLY_FULFILLED
    }
    expect(canAddRequestForOfferActivity(offerReceivedMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.OFFER_RECEIVED,
      toState: RequestForOfferState.EXPIRED
    }
    expect(canAddRequestForOfferActivity(offerReceivedMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.OFFER_RECEIVED,
      toState: RequestForOfferState.CANCELLED
    }
    expect(canAddRequestForOfferActivity(offerReceivedMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.OFFER_RECEIVED,
      toState: RequestForOfferState.OFFER_RECEIVED
    }
    expect(canAddRequestForOfferActivity(offerReceivedMock, activity)).toBeTruthy()
  })
  test('returns true if RequestForOffer is partially and next state is valid', () => {
    const partiallyFulfilledMock = { ...notExpiredMock, state: RequestForOfferState.PARTIALLY_FULFILLED }
    let activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.PARTIALLY_FULFILLED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.OFFER_RECEIVED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.FULFILLED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.CANCELLED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: RequestForOfferState.PARTIALLY_FULFILLED,
      toState: RequestForOfferState.EXPIRED
    }
    expect(canAddRequestForOfferActivity(partiallyFulfilledMock, activity)).toBeTruthy()
  })
})

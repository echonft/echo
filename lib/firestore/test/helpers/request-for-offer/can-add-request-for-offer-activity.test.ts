import { generateRequestForOfferActivity } from '../../../src/builders/request-for-offer/generate-request-for-offer-activity'
import { canAddRequestForOfferActivity } from '../../../src/helpers/request-for-offer/can-add-request-for-offer-activity'
import { FirestoreRequestForOfferActivityPrototype } from '../../../src/types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canAddRequestForOfferActivity', () => {
  const pastDate = dayjs().subtract(1, 'month')
  const futureDate = dayjs().add(1, 'month')
  const mockActivity: FirestoreRequestForOfferActivityPrototype = generateRequestForOfferActivity(
    'OFFER_RECEIVED',
    'CREATED'
  )
  test('returns false if new activity is not using the proper from state', () => {
    let activity: FirestoreRequestForOfferActivityPrototype = { ...mockActivity, fromState: undefined }
    expect(canAddRequestForOfferActivity('EXPIRED', futureDate, activity)).toBeFalsy()
    activity = { ...mockActivity, fromState: 'OFFER_RECEIVED' }
    expect(canAddRequestForOfferActivity('EXPIRED', futureDate, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is expired (by date)', () => {
    expect(canAddRequestForOfferActivity('EXPIRED', pastDate, mockActivity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is expired (by state)', () => {
    expect(canAddRequestForOfferActivity('EXPIRED', pastDate, mockActivity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is cancelled', () => {
    const activity: FirestoreRequestForOfferActivityPrototype = { ...mockActivity, fromState: 'CANCELLED' }
    expect(canAddRequestForOfferActivity('CANCELLED', futureDate, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer is fulfilled', () => {
    const activity: FirestoreRequestForOfferActivityPrototype = { ...mockActivity, fromState: 'FULFILLED' }
    expect(canAddRequestForOfferActivity('FULFILLED', futureDate, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer received and new activity is created', () => {
    const activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'OFFER_RECEIVED',
      toState: 'CREATED'
    }
    expect(canAddRequestForOfferActivity('OFFER_RECEIVED', futureDate, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer partially fulfilled and new activity is created', () => {
    const activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'CREATED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeFalsy()
  })
  test('returns false if RequestForOffer if offer created and new activity is not offer received, expired or cancelled', () => {
    let activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'CREATED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeFalsy()
    activity = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'FULFILLED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeFalsy()
    activity = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'PARTIALLY_FULFILLED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeFalsy()
  })
  test('returns true if RequestForOffer is created and next state is valid', () => {
    let activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'OFFER_RECEIVED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'EXPIRED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'CREATED',
      toState: 'CANCELLED'
    }
    expect(canAddRequestForOfferActivity('CREATED', futureDate, activity)).toBeTruthy()
  })
  test('returns true if RequestForOffer is offer received and next state is valid', () => {
    let activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'OFFER_RECEIVED',
      toState: 'PARTIALLY_FULFILLED'
    }
    expect(canAddRequestForOfferActivity('OFFER_RECEIVED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'OFFER_RECEIVED',
      toState: 'EXPIRED'
    }
    expect(canAddRequestForOfferActivity('OFFER_RECEIVED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'OFFER_RECEIVED',
      toState: 'CANCELLED'
    }
    expect(canAddRequestForOfferActivity('OFFER_RECEIVED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'OFFER_RECEIVED',
      toState: 'OFFER_RECEIVED'
    }
    expect(canAddRequestForOfferActivity('OFFER_RECEIVED', futureDate, activity)).toBeTruthy()
  })
  test('returns true if RequestForOffer is partially and next state is valid', () => {
    let activity: FirestoreRequestForOfferActivityPrototype = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'PARTIALLY_FULFILLED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'OFFER_RECEIVED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'FULFILLED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'CANCELLED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeTruthy()
    activity = {
      ...mockActivity,
      fromState: 'PARTIALLY_FULFILLED',
      toState: 'EXPIRED'
    }
    expect(canAddRequestForOfferActivity('PARTIALLY_FULFILLED', futureDate, activity)).toBeTruthy()
  })
})

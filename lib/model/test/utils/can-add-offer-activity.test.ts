import { canAddOfferActivity, generateOfferActivity, OfferState } from '../../src'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canAddOfferActivity', () => {
  const mockActivity = generateOfferActivity(OfferState.ACCEPTED, OfferState.OPEN)
  test('returns false if new activity is not using the proper from state', () => {
    expect(canAddOfferActivity(OfferState.REJECTED, dayjs(), mockActivity)).toBeFalsy()
  })
  test('returns false if offer is expired', () => {
    expect(canAddOfferActivity(OfferState.OPEN, dayjs().subtract(1, 'day'), mockActivity)).toBeFalsy()
  })
  test('returns false if is cancelled/expired/completed/rejected', () => {
    expect(
      canAddOfferActivity(OfferState.CANCELLED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.CANCELLED
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity(OfferState.EXPIRED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.EXPIRED
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity(OfferState.COMPLETED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.COMPLETED
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity(OfferState.REJECTED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.REJECTED
      })
    ).toBeFalsy()
  })
  test('returns false if offer is accepted and next state is not completed', () => {
    expect(
      canAddOfferActivity(OfferState.ACCEPTED, dayjs().add(1, 'day'), {
        ...mockActivity,
        toState: OfferState.CANCELLED,
        fromState: OfferState.REJECTED
      })
    ).toBeFalsy()
  })
  test('returns false if state is wrong', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      canAddOfferActivity('test', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'test'
      })
    ).toBeFalsy()
  })
  test('returns true if offer is accepted and next state is completed', () => {
    expect(
      canAddOfferActivity(OfferState.ACCEPTED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.ACCEPTED,
        toState: OfferState.REJECTED
      })
    ).toBeFalsy()
  })
  test('returns true if offer is open', () => {
    expect(canAddOfferActivity(OfferState.OPEN, dayjs().add(1, 'day'), mockActivity)).toBeTruthy()
  })
  test('returns true if offer is accepted and next state is completed', () => {
    expect(
      canAddOfferActivity(OfferState.ACCEPTED, dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: OfferState.ACCEPTED,
        toState: OfferState.COMPLETED
      })
    ).toBeTruthy()
  })
})

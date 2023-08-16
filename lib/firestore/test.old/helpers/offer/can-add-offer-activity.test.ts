import { generateOfferActivity } from '../../../src/builders/offer/generate-offer-actitivity'
import { canAddOfferActivity } from '../../../src/helpers/offer/can-add-offer-activity'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - canAddOfferActivity', () => {
  const mockActivity = generateOfferActivity('ACCEPTED', 'OPEN')
  test('returns false if new activity is not using the proper from state', () => {
    expect(canAddOfferActivity('REJECTED', dayjs(), mockActivity)).toBeFalsy()
  })
  test('returns false if offer is expired', () => {
    expect(canAddOfferActivity('OPEN', dayjs().subtract(1, 'day'), mockActivity)).toBeFalsy()
  })
  test('returns false if is cancelled/expired/completed/rejected', () => {
    expect(
      canAddOfferActivity('CANCELLED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'CANCELLED'
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity('EXPIRED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'EXPIRED'
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity('COMPLETED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'COMPLETED'
      })
    ).toBeFalsy()
    expect(
      canAddOfferActivity('REJECTED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'REJECTED'
      })
    ).toBeFalsy()
  })
  test('returns false if offer is accepted and next state is not completed', () => {
    expect(
      canAddOfferActivity('ACCEPTED', dayjs().add(1, 'day'), {
        ...mockActivity,
        toState: 'CANCELLED',
        fromState: 'REJECTED'
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
      canAddOfferActivity('ACCEPTED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'ACCEPTED',
        toState: 'REJECTED'
      })
    ).toBeFalsy()
  })
  test('returns true if offer is open', () => {
    expect(canAddOfferActivity('OPEN', dayjs().add(1, 'day'), mockActivity)).toBeTruthy()
  })
  test('returns true if offer is accepted and next state is completed', () => {
    expect(
      canAddOfferActivity('ACCEPTED', dayjs().add(1, 'day'), {
        ...mockActivity,
        fromState: 'ACCEPTED',
        toState: 'COMPLETED'
      })
    ).toBeTruthy()
  })
})

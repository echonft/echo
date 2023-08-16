import { generateRequestForOfferActivity } from '../../../src/builders/request-for-offer/generate-request-for-offer-activity'
import { beforeAll, describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - generateRequestForOfferActivity', () => {
  let beforeTestDayjs: dayjs.Dayjs
  beforeAll(() => {
    // Subtract a second to ensure tests will always run, otherwise isAfter might not be true
    beforeTestDayjs = dayjs().subtract(1, 'second')
  })
  test('returns proper activity without from state', () => {
    let activity = generateRequestForOfferActivity('CREATED')
    expect(activity.toState).toBe('CREATED')
    expect(activity.fromState).toBeUndefined()
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()

    activity = generateRequestForOfferActivity('EXPIRED', undefined)
    expect(activity.toState).toBe('EXPIRED')
    expect(activity.fromState).toBeUndefined()
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()
  })
  test('returns proper activity with from state', () => {
    let activity = generateRequestForOfferActivity('EXPIRED', 'CREATED')
    expect(activity.toState).toBe('EXPIRED')
    expect(activity.fromState).toBe('CREATED')
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()

    activity = generateRequestForOfferActivity('OFFER_RECEIVED', 'CREATED')
    expect(activity.toState).toBe('OFFER_RECEIVED')
    expect(activity.fromState).toBe('CREATED')
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()
  })
})

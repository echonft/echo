import { RequestForOfferState } from '../../../types/request-for-offer-state'
import { generateRequestForOfferActivity } from '../generate-request-for-offer-activity'
import { beforeAll, describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('utils - request-for-offer - generateRequestForOfferActivity', () => {
  let beforeTestDayjs: dayjs.Dayjs
  beforeAll(() => {
    // Subtract a second to ensure tests will always run, otherwise isAfter might not be true
    beforeTestDayjs = dayjs().subtract(1, 'second')
  })
  test('returns proper activity without from state', () => {
    let activity = generateRequestForOfferActivity(RequestForOfferState.CREATED)
    expect(activity.toState).toBe(RequestForOfferState.CREATED)
    expect(activity.fromState).toBeUndefined()
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()

    activity = generateRequestForOfferActivity(RequestForOfferState.EXPIRED, undefined)
    expect(activity.toState).toBe(RequestForOfferState.EXPIRED)
    expect(activity.fromState).toBeUndefined()
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()
  })
  test('returns proper activity with from state', () => {
    let activity = generateRequestForOfferActivity(RequestForOfferState.EXPIRED, RequestForOfferState.CREATED)
    expect(activity.toState).toBe(RequestForOfferState.EXPIRED)
    expect(activity.fromState).toBe(RequestForOfferState.CREATED)
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()

    activity = generateRequestForOfferActivity(RequestForOfferState.OFFER_RECEIVED, RequestForOfferState.CREATED)
    expect(activity.toState).toBe(RequestForOfferState.OFFER_RECEIVED)
    expect(activity.fromState).toBe(RequestForOfferState.CREATED)
    expect(activity.date.isAfter(beforeTestDayjs)).toBeTruthy()
  })
})

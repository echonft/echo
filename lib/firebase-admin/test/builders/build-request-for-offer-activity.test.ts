import { buildRequestForOfferActivity } from '../../src/builders/request-for-offer/build-request-for-offer-activity'
import { RequestForOfferState } from '@echo/model'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('builders - requestForOffer - buildRequestForOfferActivity', () => {
  const beforeTest = dayjs().subtract(1, 'second')
  test('valid data returns proper object', async () => {
    let activity = await buildRequestForOfferActivity({
      date: dayjs(),
      fromState: undefined,
      toState: RequestForOfferState.CREATED
    })
    expect(activity.fromState).toBeUndefined()
    expect(activity.toState).toBe(RequestForOfferState.CREATED)
    expect(dayjs.unix(activity.date).isAfter(beforeTest)).toBeTruthy()

    activity = await buildRequestForOfferActivity({
      date: dayjs(),
      fromState: RequestForOfferState.CREATED,
      toState: RequestForOfferState.EXPIRED
    })
    expect(activity.fromState).toBe(RequestForOfferState.CREATED)
    expect(activity.toState).toBe(RequestForOfferState.EXPIRED)
    expect(dayjs.unix(activity.date).isAfter(beforeTest)).toBeTruthy()
    const now = dayjs()
    activity = await buildRequestForOfferActivity({
      date: now,
      toState: RequestForOfferState.CREATED,
      fromState: undefined
    })
    expect(activity.fromState).toBeUndefined()
    expect(activity.toState).toBe(RequestForOfferState.CREATED)
    // We use is before because unix call rounds down the time
    // TODO Find a better way to test this
    expect(dayjs.unix(activity.date).isBefore(now)).toBeTruthy()
  })
})

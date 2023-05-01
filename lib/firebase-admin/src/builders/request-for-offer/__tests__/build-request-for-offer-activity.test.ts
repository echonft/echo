import { FirestoreRequestForOfferActivityPrototype } from '../../../types/prototypes/request-for-offer/firestore-request-for-offer-activity-prototype'
import { buildRequestForOfferActivity } from '../build-request-for-offer-activity'
import { generateRequestForOfferActivity, RequestForOfferState } from '@echo/model'
import { describe, expect, test } from '@jest/globals'
import dayjs, { unix } from 'dayjs'

describe('builders - requestForOffer - buildRequestForOfferActivity', () => {
  const beforeTest = dayjs().subtract(1, 'second')
  test('valid data returns proper object', async () => {
    let activity = await buildRequestForOfferActivity(
      generateRequestForOfferActivity(RequestForOfferState.CREATED) as FirestoreRequestForOfferActivityPrototype
    )
    expect(activity.fromState).toBeUndefined()
    expect(activity.toState).toBe(RequestForOfferState.CREATED)
    expect(unix(activity.date).isAfter(beforeTest)).toBeTruthy()

    activity = await buildRequestForOfferActivity(
      generateRequestForOfferActivity(
        RequestForOfferState.EXPIRED,
        RequestForOfferState.CREATED
      ) as FirestoreRequestForOfferActivityPrototype
    )
    expect(activity.fromState).toBe(RequestForOfferState.CREATED)
    expect(activity.toState).toBe(RequestForOfferState.EXPIRED)
    expect(unix(activity.date).isAfter(beforeTest)).toBeTruthy()
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
    expect(unix(activity.date).isBefore(now)).toBeTruthy()
  })
})

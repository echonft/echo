/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertRequestForOfferActivity } from '../../../src/converters/request-for-offer/convert-request-for-offer-activity'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { describe, expect, test } from '@jest/globals'

describe('converters - request-for-offer - convertRequestForOfferActivity', () => {
  test('valid data returns proper object', async () => {
    const activities = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.activities
    const activitiesData = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.activities
    const result = await Promise.all(activities.map(convertRequestForOfferActivity))
    expect(result).toHaveLength(activities.length)
    result.map((activity, index) => expect(activity).toStrictEqual(activitiesData[index]))
  })
  // TODO Validate this behaviour?
  test('invalid data passes', async () => {
    // Undefined values passes
    const activityData = {
      date: 1676900000
    }
    // @ts-ignore
    let result = await convertRequestForOfferActivity({ date: 1676900000 })
    expect(result).toStrictEqual(activityData)
    // @ts-ignore
    result = await convertRequestForOfferActivity({})
    expect(result).toStrictEqual({})
  })
})

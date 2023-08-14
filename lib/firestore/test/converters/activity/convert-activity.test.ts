/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertActivity } from '../../../src/converters/activity/convert-activity'
import { requestForOfferFirestoreData } from '../../mocks/request-for-offer/request-for-offer-firestore-data'
import { describe, expect, test } from '@jest/globals'

describe('converters - activity - convertActivity', () => {
  test('valid data returns proper object', async () => {
    const activities = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.activities
    const activitiesData = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.activities
    const result = await Promise.all(activities.map(convertActivity))
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
    let result = await convertActivity({ date: 1676900000 })
    expect(result).toStrictEqual(activityData)
    // @ts-ignore
    result = await convertActivity({})
    expect(result).toStrictEqual({})
  })
})

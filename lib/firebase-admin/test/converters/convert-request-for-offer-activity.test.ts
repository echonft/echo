/* eslint-disable @typescript-eslint/ban-ts-comment */
import { firestoreRequestForOfferActivities } from '../../../mocks/src/request-for-offer/firestore-request-for-offer-activity'
import { requestForOfferFirestoreData } from '../../../mocks/src/request-for-offer/request-for-offer-firestore-data'
import { convertRequestForOfferActivity } from '../../src/converters/request-for-offer/convert-request-for-offer-activity'
import { describe, expect, test } from '@jest/globals'

describe('converters - request-for-offer - convertRequestForOfferActivity', () => {
  test('valid data returns proper object', async () => {
    const activities = firestoreRequestForOfferActivities
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

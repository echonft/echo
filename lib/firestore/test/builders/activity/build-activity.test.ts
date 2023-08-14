import { buildActivity } from '../../../src/builders/activity/build-activity'
import { FirestoreOfferActivityPrototype } from '../../../src/types/prototypes/offer/firestore-offer-activity-prototype'
import { offerFirestoreData } from '../../mocks/offer/offer-firestore-data'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('builders - activity - buildActivity', () => {
  const prototype: FirestoreOfferActivityPrototype = {
    date: dayjs.unix(1676984897),
    fromState: undefined,
    toState: 'OPEN'
  }
  const expected = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.activities[0]!
  it('should modify the date property with a Unix timestamp', async () => {
    const result = await buildActivity(prototype)
    expect(result).toEqual(expected)
  })
})

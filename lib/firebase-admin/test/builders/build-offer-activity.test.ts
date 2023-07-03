import { buildOfferActivity } from '../../src/builders/offer/build-offer-activity'
import { FirestoreOfferActivityPrototype, offerFirestoreData } from '@echo/firestore'
import { offers } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('builders - offer - buildOfferActivity', () => {
  const prototype = offers['LyCfl6Eg7JKuD7XJ6IPi']!.activities![0]!
  const expected = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.activities[0]!
  it('should modify the date property with a Unix timestamp', async () => {
    const result = await buildOfferActivity(prototype as FirestoreOfferActivityPrototype)
    expect(result).toEqual(expected)
  })
})

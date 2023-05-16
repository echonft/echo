import { FirestoreOfferActivityPrototype } from '../../../types/prototypes/offer/firestore-offer-activity-prototype'
import { offerData } from '../../../utils/test/mocks/offer/offer-data'
import { buildOfferActivity } from '../build-offer-activity'
import { mockOffer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('builders - offer - buildOfferActivity', () => {
  const prototype = mockOffer.activities![0]!
  const expected = offerData['LyCfl6Eg7JKuD7XJ6IPi']!.activities[0]!
  it('should modify the date property with a Unix timestamp', async () => {
    const result = await buildOfferActivity(prototype as FirestoreOfferActivityPrototype)
    expect(result.date).toEqual(expected.date)
    expect(result).toEqual(expected)
  })
})

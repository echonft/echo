import { mapOffer } from '../../src/mappers/offer/map-offer'
import { offerFirestoreData } from '../../src/mocks/offer-firestore-data'
import { offers } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOffer', () => {
  it('offer mapping', async () => {
    const offer = await mapOffer(Promise.resolve(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!))
    expect(offer).toEqual(offers['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})

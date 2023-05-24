import { mapOffer, offerFirestoreData } from '@echo/firestore'
import { offers } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOffer', () => {
  it('offer mapping', async () => {
    const offer = await mapOffer(Promise.resolve(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!))
    expect(offer).toEqual(offers['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})

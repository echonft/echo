import { offers } from '../../utils/test/mocks/offer/offer'
import { offerData } from '../../utils/test/mocks/offer/offer-data'
import { mapOffer } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapOffer', () => {
  it('offer mapping', async () => {
    const offer = await mapOffer(Promise.resolve(offerData['LyCfl6Eg7JKuD7XJ6IPi']!))
    expect(offer).toEqual(offers['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})

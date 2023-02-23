import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { offers } from '../../utils/test/mocks/offer/offer'
import { mapOffer } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapOffer', () => {
  it('offer mapping', async () => {
    const offer = await pipe(getFirestoreOfferData, mapOffer)('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toEqual(offers['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})

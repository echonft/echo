import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { offers } from '../../utils/test/mocks/offer/offer'
import { mapOffer } from '@echo/firestore/dist/mappers/offer/map-offer'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapOffer', () => {
  it('offer mapping without activities', async () => {
    const offer = await pipe(getFirestoreOfferData, mapOffer)('LyCfl6Eg7JKuD7XJ6IPi', {
      activities: { getDocs: false }
    })
    expect(offer).toEqual(Object.assign({}, offers['LyCfl6Eg7JKuD7XJ6IPi']!, { activities: undefined }))
  })

  it('offer mapping with activities', async () => {
    const offer = await pipe(getFirestoreOfferData, mapOffer)('LyCfl6Eg7JKuD7XJ6IPi', {
      activities: { getDocs: true }
    })
    expect(offer).toEqual(offers['LyCfl6Eg7JKuD7XJ6IPi'])
  })
})

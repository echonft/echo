import { getFirestoreOfferData } from '../../../src/data/offer/get-firestore-offer-data'
import { offerFirestoreData } from '../../mocks/offer/offer-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('convertOffer', () => {
  it('offer conversion', async () => {
    const offer = await getFirestoreOfferData('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toEqual(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  })
})

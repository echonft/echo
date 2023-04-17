import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { offerData } from '../../utils/test/mocks/offer/offer-data'
import { describe, expect, it } from '@jest/globals'

describe('convertOffer', () => {
  it('offer conversion', async () => {
    const offer = await getFirestoreOfferData('LyCfl6Eg7JKuD7XJ6IPi')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(offer).toEqual(offerData['LyCfl6Eg7JKuD7XJ6IPi']!)
  })
})

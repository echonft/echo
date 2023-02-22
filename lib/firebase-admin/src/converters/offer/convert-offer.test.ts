import { getFirestoreOfferData } from '../../data/offer/get-firestore-offer-data'
import { offerData } from '../../utils/test/mocks/offer/offer-data'
import { describe, expect, it } from '@jest/globals'

describe('convertOffer', () => {
  it('offer conversion without activities', async () => {
    const offer = await getFirestoreOfferData('LyCfl6Eg7JKuD7XJ6IPi', {
      activities: {
        getDocs: false
      }
    })
    expect(offer).toEqual(
      Object.assign({}, offerData['LyCfl6Eg7JKuD7XJ6IPi']!, {
        activities: {
          path: 'offers/LyCfl6Eg7JKuD7XJ6IPi/activities',
          data: undefined
        }
      })
    )
  })

  it('offer conversion with activities', async () => {
    const offer = await getFirestoreOfferData('LyCfl6Eg7JKuD7XJ6IPi', {
      activities: {
        getDocs: true
      }
    })
    expect(offer).toEqual(offerData['LyCfl6Eg7JKuD7XJ6IPi']!)
  })

  // TODO test constraints
})

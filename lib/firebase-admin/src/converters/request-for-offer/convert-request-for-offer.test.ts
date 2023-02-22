import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { requestForOfferData } from '../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { describe, expect, it } from '@jest/globals'

describe('convertRequestForOffer', () => {
  it('request for offer conversion without activities', async () => {
    const requestForOffer = await getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4', {
      activities: {
        getDocs: false
      }
    })
    expect(requestForOffer).toEqual(
      Object.assign({}, requestForOfferData['jUzMtPGKM62mMhEcmbN4']!, {
        activities: {
          path: 'requests-for-offer/jUzMtPGKM62mMhEcmbN4/activities',
          data: undefined
        }
      })
    )
    expect(true).toBeTruthy()
  })

  it('request for offer conversion with activities', async () => {
    const requestForOffer = await getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4', {
      activities: {
        getDocs: true
      }
    })
    expect(requestForOffer).toEqual(requestForOfferData['jUzMtPGKM62mMhEcmbN4']!)
  })

  // TODO test constraints
})

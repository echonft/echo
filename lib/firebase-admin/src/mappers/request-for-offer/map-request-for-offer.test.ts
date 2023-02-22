import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { requestsForOffer } from '../../utils/test/mocks/request-for-offer/request-for-offer'
import { mapRequestForOffer } from '@echo/firestore/dist/mappers/request-for-offer/map-request-for-offer'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapRequestForOffer', () => {
  it('request for offer mapping without activities', async () => {
    const requestForOffer = await pipe(getFirestoreRequestForOfferData, mapRequestForOffer)('jUzMtPGKM62mMhEcmbN4', {
      activities: { getDocs: false }
    })
    expect(requestForOffer).toEqual(
      Object.assign({}, requestsForOffer['jUzMtPGKM62mMhEcmbN4']!, { activities: undefined })
    )
  })

  it('request for offer mapping with activities', async () => {
    const requestForOffer = await pipe(getFirestoreRequestForOfferData, mapRequestForOffer)('jUzMtPGKM62mMhEcmbN4', {
      activities: { getDocs: true }
    })
    expect(requestForOffer).toEqual(requestsForOffer['jUzMtPGKM62mMhEcmbN4'])
  })
})

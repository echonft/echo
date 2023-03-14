import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { requestsForOffer } from '../../utils/test/mocks/request-for-offer/request-for-offer'
import { mapRequestForOffer } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapRequestForOffer', () => {
  it('request for offer mapping', async () => {
    const requestForOffer = await pipe(getFirestoreRequestForOfferData, mapRequestForOffer)('jUzMtPGKM62mMhEcmbN4')
    expect(requestForOffer).toEqual(requestsForOffer['jUzMtPGKM62mMhEcmbN4'])
  })
})

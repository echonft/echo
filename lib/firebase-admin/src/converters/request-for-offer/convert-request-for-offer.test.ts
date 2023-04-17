import { getFirestoreRequestForOfferData } from '../../data/request-for-offer/get-firestore-request-for-offer-data'
import { requestForOfferData } from '../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { describe, expect, it } from '@jest/globals'

describe('convertRequestForOffer', () => {
  it('request for offer conversion', async () => {
    const requestForOffer = await getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(requestForOffer).toEqual(requestForOfferData['jUzMtPGKM62mMhEcmbN4']!)
  })
})

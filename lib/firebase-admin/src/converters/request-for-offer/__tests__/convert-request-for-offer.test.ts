import { requestsForOfferData } from '../../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { requestForOfferSnapshots } from '../../../utils/test/mocks/request-for-offer/request-for-offer-snapshot'
import { convertRequestForOffer } from '../convert-request-for-offer'
import { describe, expect, it } from '@jest/globals'

describe('convertRequestForOffer', () => {
  it('request for offer conversion', async () => {
    const requestForOfferData = requestsForOfferData['jUzMtPGKM62mMhEcmbN4']!
    const result = await convertRequestForOffer(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!)
    expect(result).toStrictEqual(requestForOfferData)
  })
})

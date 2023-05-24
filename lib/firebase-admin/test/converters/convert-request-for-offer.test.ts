import { convertRequestForOffer } from '../../src/converters/request-for-offer/convert-request-for-offer'
import { requestForOfferSnapshots } from '../mocks/request-for-offer/request-for-offer-snapshot'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('convertRequestForOffer', () => {
  it('request for offer conversion', async () => {
    const requestForOfferData = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await convertRequestForOffer(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!)
    expect(result).toStrictEqual(requestForOfferData)
  })
})

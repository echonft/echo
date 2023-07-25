import { convertRequestForOffer } from '../../../src/converters/request-for-offer/convert-request-for-offer'
import { getDocSnapshot } from '../../../src/utils/document/get-doc-snapshot'
import { CollectionName, requestForOfferFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('convertRequestForOffer', () => {
  it('request for offer conversion', async () => {
    const requestForOfferSnapshot = await getDocSnapshot(CollectionName.REQUESTS_FOR_OFFER, 'jUzMtPGKM62mMhEcmbN4')
    const requestForOfferData = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await convertRequestForOffer(requestForOfferSnapshot)
    expect(result).toEqual(requestForOfferData)
  })
})

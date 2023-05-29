import { mapRequestForOffer, requestForOfferFirestoreData } from '@echo/firestore'
import { requestsForOffer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mapRequestForOffer', () => {
  it('request for offer mapping', async () => {
    const expected = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
    const requestForOffer = await mapRequestForOffer(
      Promise.resolve(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
    )
    expect(requestForOffer).toEqual(expected)
  })
})

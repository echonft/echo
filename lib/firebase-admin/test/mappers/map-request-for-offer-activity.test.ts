import { requestsForOffer } from '../../../mocks/src/request-for-offer/request-for-offer'
import { requestForOfferFirestoreData } from '../../../mocks/src/request-for-offer/request-for-offer-firestore-data'
import { mapRequestForOfferActivity } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapRequestForOfferActivity', () => {
  it('request for offer activity mapping', async () => {
    const expected = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!.activities
    const mappedActivities = await Promise.all(
      requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.activities.map((activity) =>
        mapRequestForOfferActivity(Promise.resolve(activity))
      )
    )
    expect(mappedActivities).toStrictEqual(expected)
  })
})

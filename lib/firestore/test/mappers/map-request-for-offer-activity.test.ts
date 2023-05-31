import { mapRequestForOfferActivity } from '../../src/mappers/request-for-offer/map-request-for-offer-activity'
import { requestForOfferFirestoreData } from '../../src/mocks/request-for-offer-firestore-data'
import { requestsForOffer } from '@echo/model'
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

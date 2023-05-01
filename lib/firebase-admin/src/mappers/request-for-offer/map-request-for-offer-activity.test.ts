import { requestsForOffer } from '../../utils/test/mocks/request-for-offer/request-for-offer'
import { requestsForOfferData } from '../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { mapRequestForOfferActivity } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapRequestForOfferActivity', () => {
  it('request for offer activity mapping', async () => {
    const expected = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!.activities
    const mappedActivities = await Promise.all(
      requestsForOfferData['jUzMtPGKM62mMhEcmbN4']!.activities.map((activity) =>
        mapRequestForOfferActivity(Promise.resolve(activity))
      )
    )
    expect(mappedActivities).toStrictEqual(expected)
  })
})

import { mapRequestForOfferActivity, requestForOfferFirestoreData } from '@echo/firestore'
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

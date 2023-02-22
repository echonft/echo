import { getFirestoreRequestForOfferActivityData } from '../../data/request-for-offer/get-firestore-request-for-offer-activity-data'
import { requestForOfferData } from '../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { describe, expect, it } from '@jest/globals'
import { equals, pipe, prop } from 'ramda'

describe('convertRequestForOfferActivity', () => {
  it('correct conversion', async () => {
    const requestForOfferActivity = await getFirestoreRequestForOfferActivityData(
      'jUzMtPGKM62mMhEcmbN4',
      'ff4BhlyTq6SpziB0HbFk'
    )
    expect(requestForOfferActivity).toEqual(
      requestForOfferData['jUzMtPGKM62mMhEcmbN4']!.activities.data!.find(
        pipe(prop('id'), equals('ff4BhlyTq6SpziB0HbFk'))
      )
    )
  })
})

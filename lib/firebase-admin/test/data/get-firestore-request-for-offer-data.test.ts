import { getFirestoreRequestForOfferData } from '../../src/data/request-for-offer/get-firestore-request-for-offer-data'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('crud - request-for-offer - getFirestoreRequestForOfferData', () => {
  it('if snapshot does not exist, receive an error', () => {
    getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4a')
      .then(() => expect(false).toBeTruthy())
      .catch((error) =>
        expect(error).toBe('getFirestoreRequestForOfferData cannot find data for: jUzMtPGKM62mMhEcmbN4a')
      )
  })
  it('if snapshot does not exist, receive an error', () => {
    getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4')
      .then((data) => expect(data).toStrictEqual(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']))
      .catch(() => expect(false).toBeTruthy())
  })
})

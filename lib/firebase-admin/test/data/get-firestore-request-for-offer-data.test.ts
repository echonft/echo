import { getFirestoreRequestForOfferData } from '../../src/data/request-for-offer/get-firestore-request-for-offer-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('crud - request-for-offer - getFirestoreRequestForOfferData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if snapshot does not exist, receive an error', () => {
    getFirestoreRequestForOfferData('test')
      .then(() => expect(false).toBeTruthy())
      .catch((error) => expect(error).toBeDefined())
  })
  // FIXME not working
  // it('if snapshot exists, receive data', () => {
  //   getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4')
  //     .then((data) => expect(data).toEqual(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']))
  //     .catch(() => expect(false).toBeTruthy())
  // })
})

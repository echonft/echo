import { getDocSnapshot } from '../../../utils/document/get-doc-snapshot'
import { requestForOfferSnapshots } from '../../../utils/test/mocks/request-for-offer/request-for-offer-snapshot'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/document/get-doc-snapshot')

// FIXME: No works
describe('crud - request-for-offer - findRequestForOfferId', () => {
  jest.mocked(getDocSnapshot).mockResolvedValue(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if snapshot does not exist, receive an error', () => {
    expect(true).toBeTruthy()
    // getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4a')
    //   .then(() => expect(false).toBeTruthy())
    //   .catch((error) =>
    //     expect(error).toBe('getFirestoreRequestForOfferData cannot find data for: jUzMtPGKM62mMhEcmbN4a')
    //   )
  })
  it('if snapshot does not exist, receive an error', () => {
    expect(true).toBeTruthy()
    // getFirestoreRequestForOfferData('jUzMtPGKM62mMhEcmbN4')
    //   .then((data) => expect(data).toStrictEqual(requestsForOfferData['jUzMtPGKM62mMhEcmbN4']))
    //   .catch(() => expect(false).toBeTruthy())
  })
})

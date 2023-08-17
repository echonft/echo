import { findRequestForOfferById } from '../../../src/crud/listing/find-request-for-offer-by-id'
import { getFirestoreRequestForOfferData } from '../../../src/data/request-for-offer/get-firestore-request-for-offer-data'
import { requestForOfferFirestoreData } from '../../mocks/request-for-offer/request-for-offer-firestore-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/data/request-for-offer/get-firestore-request-for-offer-data')

describe('crud - request-for-offer - findRequestForOfferById', () => {
  const mockFunction = jest
    .mocked(getFirestoreRequestForOfferData)
    .mockResolvedValue(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds the request for offer with proper id', async () => {
    const expected = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    const requestForOffer = await findRequestForOfferById('jUzMtPGKM62mMhEcmbN4')
    expect(requestForOffer).toStrictEqual(expected)
  })
  it('if getFirestoreRequestForOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce(new Error('cannot find data'))
    try {
      await findRequestForOfferById('1')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

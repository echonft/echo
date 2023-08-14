import { findRequestForOfferByOfferId } from '../../../src/crud/request-for-offer/find-request-for-offer-by-offer-id'
import { requestForOfferFirestoreData } from '../../mocks/request-for-offer/request-for-offer-firestore-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('crud - request-for-offer - findRequestForOfferByOfferId', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds the request for offer with proper offer id', async () => {
    const expected = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    const requestForOffer = await findRequestForOfferByOfferId('LyCfl6Eg7JKuD7XJ6IPi')
    expect(requestForOffer).toEqual(expected)
  })
  it('fails to find the request for offer with invalid id', async () => {
    try {
      await findRequestForOfferByOfferId('test')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

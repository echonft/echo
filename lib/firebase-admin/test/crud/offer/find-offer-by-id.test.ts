import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { getFirestoreOfferData } from '../../../src/data/offer/get-firestore-offer-data'
import { offerFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/data/offer/get-firestore-offer-data')

describe('crud - offer - findOfferById', () => {
  const mockFunction = jest.mocked(getFirestoreOfferData).mockResolvedValue(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds offer with the proper id', async () => {
    const expected = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
    const offer = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(offer).toEqual(expected)
  })
  it('if getFirestoreOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce('cannot find data')
    try {
      await findOfferById('1')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

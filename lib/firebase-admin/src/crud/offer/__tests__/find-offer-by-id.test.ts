import { getFirestoreOfferData } from '../../../data/offer/get-firestore-offer-data'
import { offerData } from '../../../utils/test/mocks/offer/offer-data'
import { offerEquals } from '../../../utils/test/mocks/offer/offer-equals'
import { findOfferById } from '../find-offer-by-id'
import { mockOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../data/offer/get-firestore-offer-data')

describe('crud - offer - findOfferById', () => {
  const mockFunction = jest.mocked(getFirestoreOfferData).mockResolvedValue(offerData['LyCfl6Eg7JKuD7XJ6IPi']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds offer with the proper id', async () => {
    const expected = mockOffer
    const result = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(R.isError(result)).toBeFalsy()
    offerEquals(R.getExn(result), expected)
  })
  it('if getFirestoreOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce('cannot find data')
    const result = await findOfferById('1')
    expect(R.isError(result)).toBeTruthy()
  })
})

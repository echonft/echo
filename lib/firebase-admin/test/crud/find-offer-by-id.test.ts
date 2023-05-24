import { findOfferById } from '../../src/crud/offer/find-offer-by-id'
import { getFirestoreOfferData } from '../../src/data/offer/get-firestore-offer-data'
import { offerFirestoreData } from '@echo/firestore'
import { offers } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../data/offer/get-firestore-offer-data')

describe('crud - offer - findOfferById', () => {
  const mockFunction = jest.mocked(getFirestoreOfferData).mockResolvedValue(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds offer with the proper id', async () => {
    const expected = offers['LyCfl6Eg7JKuD7XJ6IPi']!
    const result = await findOfferById('LyCfl6Eg7JKuD7XJ6IPi')
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toStrictEqual(expected)
  })
  it('if getFirestoreOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce('cannot find data')
    const result = await findOfferById('1')
    expect(R.isError(result)).toBeTruthy()
  })
})

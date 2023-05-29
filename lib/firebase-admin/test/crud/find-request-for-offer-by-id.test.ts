import { findRequestForOfferById } from '../../src'
import { getFirestoreRequestForOfferData } from '../../src/data/request-for-offer/get-firestore-request-for-offer-data'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../src/data/request-for-offer/get-firestore-request-for-offer-data')

describe('crud - request-for-offer - findRequestForOfferById', () => {
  const mockFunction = jest
    .mocked(getFirestoreRequestForOfferData)
    .mockResolvedValue(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds the request for offer with proper id', async () => {
    const expected = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    const result = await findRequestForOfferById('jUzMtPGKM62mMhEcmbN4')
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toStrictEqual(expected)
  })
  it('if getFirestoreRequestForOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce('cannot find data')
    const result = await findRequestForOfferById('1')
    expect(R.isError(result)).toBeTruthy()
  })
})

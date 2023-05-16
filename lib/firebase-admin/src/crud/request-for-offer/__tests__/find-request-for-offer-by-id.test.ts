import { getFirestoreRequestForOfferData } from '../../../data/request-for-offer/get-firestore-request-for-offer-data'
import { requestsForOfferData } from '../../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { requestForOfferEquals } from '../../../utils/test/mocks/request-for-offer/request-for-offer-equals'
import { findRequestForOfferById } from '../find-request-for-offer-by-id'
import { mockRequestForOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../data/request-for-offer/get-firestore-request-for-offer-data')

describe('crud - request-for-offer - findRequestForOfferById', () => {
  const mockFunction = jest
    .mocked(getFirestoreRequestForOfferData)
    .mockResolvedValue(requestsForOfferData['jUzMtPGKM62mMhEcmbN4']!)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds the request for offer with proper id', async () => {
    const expected = mockRequestForOffer
    const result = await findRequestForOfferById('jUzMtPGKM62mMhEcmbN4')
    expect(R.isError(result)).toBeFalsy()
    requestForOfferEquals(R.getExn(result), expected)
  })
  it('if getFirestoreRequestForOfferData throws, returns an error', async () => {
    mockFunction.mockRejectedValueOnce('cannot find data')
    const result = await findRequestForOfferById('1')
    expect(R.isError(result)).toBeTruthy()
  })
})

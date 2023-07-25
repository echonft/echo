import { findRequestForOfferByOfferId } from '../../../src'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - request-for-offer - findRequestForOfferByOfferId', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('finds the request for offer with proper offer id', async () => {
    const expected = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
    const result = await findRequestForOfferByOfferId('LyCfl6Eg7JKuD7XJ6IPi')
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toEqual(expected)
  })
  it('fails to find the request for offer with invalid id', async () => {
    const result = await findRequestForOfferByOfferId('test')
    expect(R.isError(result)).toBeTruthy()
  })
})

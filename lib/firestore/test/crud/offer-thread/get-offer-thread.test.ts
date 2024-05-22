import { getOfferThread } from '@echo/firestore/crud/offer-thread/get-offer-thread'
import { getOfferThreadMock } from '@echo/firestore-mocks/offer-thread/get-offer-thread-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - offer-thread - getOfferThread', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await getOfferThread('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const mock = getOfferThreadMock()
    const document = await getOfferThread(mock.offerId)
    expect(document).toStrictEqual(mock)
  })
})

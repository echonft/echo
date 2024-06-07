import { getSwapByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - swap - getSwapByOfferId', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await getSwapByOfferId('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerId = offerMockFromJohnnycageId()
    const document = (await getSwapByOfferId(offerId))!
    expect(document.offerId).toStrictEqual(offerId)
    expect(document.transactionId).toStrictEqual('0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b')
  })
})

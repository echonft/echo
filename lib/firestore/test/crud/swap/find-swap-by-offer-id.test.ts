import { findSwapByOfferId } from '@echo/firestore/crud/swap/find-swap-by-offer-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - swap - findSwapByOfferId', () => {
  it('returns undefined if the document does not exist', async () => {
    const document = await findSwapByOfferId('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const document = (await findSwapByOfferId(offerId))!
    expect(document.id).toStrictEqual('2ipuV3drjQlzEgkUkW7q')
    expect(document.offerId).toStrictEqual(offerId)
    expect(document.transactionId).toStrictEqual('0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b')
  })
})

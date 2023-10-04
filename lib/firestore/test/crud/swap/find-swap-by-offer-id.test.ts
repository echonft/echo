import { findSwapByOfferId } from '@echo/firestore/crud/swaps/find-swap-by-offer-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - swap - findSwapByOfferId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  it('returns undefined if the document does not exist', async () => {
    const document = await findSwapByOfferId('not-found')
    expect(document).toBeUndefined()
  })
  it('returns the document found', async () => {
    const offerId = 'ASkFpKoHEHVH0gd69t1G'
    const document = (await findSwapByOfferId(offerId))!
    expect(document.id).toStrictEqual('2ipuV3drjQlzEgkUkW7q')
    expect(document.offerId).toStrictEqual(offerId)
    expect(document.txId).toStrictEqual('0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b')
  })
})

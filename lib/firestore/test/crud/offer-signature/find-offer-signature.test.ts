import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { deleteOfferSignature } from '@test-utils/offer-signature/delete-offer-signature'
import { uncheckedAddOfferSignature } from '@test-utils/offer-signature/unchecked-add-offer-signature'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { isNil } from 'ramda'

describe('CRUD - offer-signature - findOfferSignature', () => {
  let createdOfferSignatureId: string | undefined
  const offerId = 'offer-id'
  const userId = 'user-id'
  const signature = 'signature'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    createdOfferSignatureId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        // nothing to do
      }
    }
  })

  it('returns undefined if the offer signature is not found', async () => {
    const createdOfferSignature = await uncheckedAddOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const notFoundOfferSignature = await findOfferSignature(offerId, 'not-found')
    const notFoundOfferSignature1 = await findOfferSignature('not-found', userId)
    const notFoundOfferSignature2 = await findOfferSignature(userId, offerId)
    expect(notFoundOfferSignature).toBeUndefined()
    expect(notFoundOfferSignature1).toBeUndefined()
    expect(notFoundOfferSignature2).toBeUndefined()
  })

  it('returns the offer signature with the given offer id and user id', async () => {
    const createdOfferSignature = await uncheckedAddOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const foundOfferSignature = (await findOfferSignature(offerId, userId))!
    expect(foundOfferSignature).toStrictEqual(createdOfferSignature)
  })
})

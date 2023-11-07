import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { deleteOfferSignature } from '@test-utils/offer-signature/delete-offer-signature'
import { unchecked_addOfferSignature } from '@test-utils/offer-signature/unchecked_add-offer-signature'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { isNil } from 'ramda'

describe('CRUD - offer-signature - findOfferSignature', () => {
  let createdOfferSignatureId: string | undefined
  const offerId = 'offer-id'
  const userId = 'user-id'
  const signature = '0xsignature'

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
    const createdOfferSignature = await unchecked_addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const notFoundOfferSignature = await findOfferSignature('not-found')
    expect(notFoundOfferSignature).toBeUndefined()
  })

  it('returns the offer signature with the given offer id and user id', async () => {
    const createdOfferSignature = await unchecked_addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const foundOfferSignature = (await findOfferSignature(offerId))!
    expect(foundOfferSignature).toStrictEqual(createdOfferSignature)
  })
})

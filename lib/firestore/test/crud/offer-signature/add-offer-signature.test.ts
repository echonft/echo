import { addOfferSignature } from '@echo/firestore/crud/offer-signature/add-offer-signature'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { deleteOfferSignature } from '@test-utils/offer-signature/delete-offer-signature'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { deleteUser } from '@test-utils/user/delete-user'
import { unchecked_addUser } from '@test-utils/user/unchecked_add-user'
import { isNil } from 'ramda'

describe('CRUD - offer-signature - findOfferSignature', () => {
  let createdUserId: string | undefined
  let createdOfferSignatureId: string | undefined
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const userId = 'oE6yUEQBPn7PZ89yMjKn'
  const signature = '0xsignature'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(() => {
    createdUserId = undefined
    createdOfferSignatureId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdUserId)) {
      try {
        await deleteUser(createdUserId)
      } catch (e) {
        // nothing to do
      }
    }
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        // nothing to do
      }
    }
  })

  it('throws if the offer does not exist', async () => {
    await expect(addOfferSignature({ offerId: 'not-found', userId, signature })).rejects.toBeDefined()
  })
  it('throws if the user does not exist', async () => {
    await expect(addOfferSignature({ offerId, userId: 'not-found', signature })).rejects.toBeDefined()
  })
  it('throws if the user is neither the sender nor the receiver', async () => {
    const user = await unchecked_addUser({
      username: 'not-receiver',
      discord: { avatarUrl: 'avatarUrl', username: 'discord-username', id: 'discord-id', bannerColor: 'color' }
    })
    createdUserId = user.id
    await expect(addOfferSignature({ offerId, userId: user.id, signature })).rejects.toBeDefined()
  })
  it('adds the offer signature if it does not exist', async () => {
    const createdOfferSignature = await addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const foundOfferSignature = (await findOfferSignature(offerId))!
    expect(foundOfferSignature).toStrictEqual(createdOfferSignature)
    expectDateNumberIsNow(foundOfferSignature.createdAt)
  })
  it('updates the offer signature if it already exists', async () => {
    const { id } = await addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = id
    const createdOfferSignature = await addOfferSignature({ offerId, userId, signature: '0xnew-signature' })
    const foundOfferSignature = (await findOfferSignature(offerId))!
    expect(createdOfferSignature.id).toBe(createdOfferSignatureId)
    expect(foundOfferSignature).toStrictEqual(createdOfferSignature)
  })
})

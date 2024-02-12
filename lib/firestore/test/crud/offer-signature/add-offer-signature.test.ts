import { addOfferSignature } from '@echo/firestore/crud/offer-signature/add-offer-signature'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { deleteOfferSignature } from '@echo/firestore-test/offer-signature/delete-offer-signature'
import { assertUsers } from '@echo/firestore-test/user/assert-users'
import { deleteUser } from '@echo/firestore-test/user/delete-user'
import { unchecked_addUser } from '@echo/firestore-test/user/unchecked_add-user'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-signature - findOfferSignature', () => {
  let createdUserId: Nullable<string>
  let createdOfferSignatureId: Nullable<string>
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const userId = 'oE6yUEQBPn7PZ89yMjKn'
  const signature = '0xsignature'

  beforeAll(async () => {
    await assertUsers()
  })
  afterAll(async () => {
    await assertUsers()
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
        logger.error(`Error deleting user with id ${createdUserId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        logger.error(`Error deleting offer signature with id ${createdOfferSignatureId}: ${errorMessage(e)}`)
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

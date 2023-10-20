import { acceptOffer } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { type OfferState } from '@echo/model/types/offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import type { HexString } from '@echo/utils/types/hex-string'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { deleteOfferSignature } from '@test-utils/offer-signature/delete-offer-signature'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  let createdOfferSignatureId: string | undefined
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'
  const userId = 'oE6yUEQBPn7PZ89yMjKn'
  const signature: HexString =
    '0x4d374b2212ea29483f6aba22a36bd9706fa410aa20e9954e39e407fd8018370a2315258d336fafca5c5a826dd992a91bca81e1d920d4bcc4bceee95b26682c7e1b'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const offer = (await findOfferById(offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
    createdOfferSignatureId = undefined
  })
  afterEach(async () => {
    await uncheckedUpdateOffer(offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        // nothing to do
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(acceptOffer('not-found', userId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(acceptOffer(offerId, userId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, userId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'ACCEPTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, userId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, userId, signature)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(acceptOffer(offerId, userId, signature)).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await uncheckedUpdateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await acceptOffer(offerId, userId, signature)
    const updatedOffer = (await findOfferById(offerId))!
    const createdOfferSignature = (await findOfferSignature(offerId))!
    createdOfferSignatureId = createdOfferSignature.id
    expect(updatedOffer.state).toEqual('ACCEPTED')
    expect(createdOfferSignature.offerId).toEqual(offerId)
    expect(createdOfferSignature.userId).toEqual(userId)
    expect(createdOfferSignature.signature).toEqual(signature)
    expectDateNumberIsNow(updatedOffer.updatedAt)
  })
})

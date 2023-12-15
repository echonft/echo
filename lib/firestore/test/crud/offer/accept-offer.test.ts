import { acceptOffer, type AcceptOfferArgs } from '@echo/firestore/crud/offer/accept-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { deleteOfferSignature } from '@echo/firestore-test/offer-signature/delete-offer-signature'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type OfferState } from '@echo/model/types/offer-state'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - acceptOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  let createdOfferSignatureId: string | undefined
  let createdStateUpdateId: string | undefined
  const pastDate = dayjs().subtract(1, 'day').unix()
  const futureDate = dayjs().add(1, 'day').unix()
  const args: AcceptOfferArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    userId: 'oE6yUEQBPn7PZ89yMjKn',
    signature:
      '0x4d374b2212ea29483f6aba22a36bd9706fa410aa20e9954e39e407fd8018370a2315258d336fafca5c5a826dd992a91bca81e1d920d4bcc4bceee95b26682c7e1b',
    updateArgs: {
      trigger: {
        by: 'johnnycagewins'
      }
    }
  }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await tearDownRemoteFirestoreTests()
  })
  beforeEach(async () => {
    const offer = (await findOfferById(args.offerId))!
    initialState = offer.state
    initialExpiresAt = offer.expiresAt
    initialUpdatedAt = offer.updatedAt
    createdOfferSignatureId = undefined
  })
  afterEach(async () => {
    await unchecked_updateOffer(args.offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        logger.error(`Error deleting offer signature with id ${createdOfferSignatureId}: ${errorMessage(e)}`)
      }
    }
    if (!isNil(createdStateUpdateId)) {
      try {
        await deleteOfferUpdate(createdStateUpdateId)
      } catch (e) {
        logger.error(`Error deleting offer update with id ${createdStateUpdateId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if the offer is not found', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), acceptOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: pastDate })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_CANCELLED, expiresAt: futureDate })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_ACCEPTED, expiresAt: futureDate })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_REJECTED, expiresAt: futureDate })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_COMPLETED, expiresAt: futureDate })
    await expect(acceptOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not the receiver', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: futureDate })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-receiver'
          }
        }),
        acceptOffer
      )(args)
    ).rejects.toBeDefined()
  })
  it('accept offer', async () => {
    await unchecked_updateOffer(args.offerId, { state: OFFER_STATE_OPEN, expiresAt: futureDate })
    await acceptOffer(args)
    const updatedOffer = (await findOfferById(args.offerId))!
    const createdOfferSignature = (await findOfferSignature(args.offerId))!
    createdOfferSignatureId = createdOfferSignature.id
    const createdStateUpdate = (await findOfferStateUpdate(args.offerId, OFFER_STATE_ACCEPTED))!
    createdStateUpdateId = createdStateUpdate.id
    expect(updatedOffer.state).toEqual(OFFER_STATE_ACCEPTED)
    expectDateNumberIsNow(updatedOffer.updatedAt)
    expect(createdOfferSignature).toBeDefined()
    expect(createdStateUpdate).toBeDefined()
  })
})

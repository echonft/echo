import { cancelOffer, type CancelOfferArgs } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type OfferState } from '@echo/model/types/offer-state'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - cancelOffer', () => {
  let initialState: OfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  let createdStateUpdateId: string | undefined
  const pastDate = dayjs().subtract(1, 'day').unix()
  const futureDate = dayjs().add(1, 'day').unix()
  const args: CancelOfferArgs = {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    updateArgs: {
      trigger: {
        by: 'crewnft_'
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
  })
  afterEach(async () => {
    await unchecked_updateOffer(args.offerId, {
      state: initialState,
      expiresAt: initialExpiresAt,
      updatedAt: initialUpdatedAt
    })
    if (!isNil(createdStateUpdateId)) {
      try {
        await deleteOfferUpdate(createdStateUpdateId)
      } catch (e) {
        // nothing to do
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), cancelOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: pastDate })
    await expect(cancelOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'CANCELLED', expiresAt: futureDate })
    await expect(cancelOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'COMPLETED', expiresAt: futureDate })
    await expect(cancelOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'REJECTED', expiresAt: futureDate })
    await expect(cancelOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not valid', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: futureDate })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-receiver-nor-sender-nor-system'
          }
        }),
        cancelOffer
      )(args)
    ).rejects.toBeDefined()
  })
  it('cancel offer', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: futureDate })
    await cancelOffer(args)
    const updatedOffer = (await findOfferById(args.offerId))!
    const createdStateUpdate = (await findOfferStateUpdate(args.offerId, 'CANCELLED'))!
    createdStateUpdateId = createdStateUpdate.id
    expect(updatedOffer.state).toEqual('CANCELLED')
    expectDateNumberIsNow(updatedOffer.updatedAt)
    expect(createdStateUpdate).toBeDefined()
  })
})

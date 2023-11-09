import type { CancelOfferArgs } from '@echo/firestore/crud/offer/cancel-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { rejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { findOfferStateUpdate } from '@echo/firestore/crud/offer-update/find-offer-state-update'
import { assertOffers } from '@echo/firestore-test/offer/assert-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { deleteOfferUpdate } from '@echo/firestore-test/offer-update/delete-offer-update'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type OfferState } from '@echo/model/types/offer-state'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

describe('CRUD - offer - rejectOffer', () => {
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
        logger.error(`Error deleting offer update with id ${createdStateUpdateId}: ${errorMessage(e)}`)
      }
    }
  })

  it('throws if the offer is undefined', async () => {
    await expect(pipe(assoc('offerId', 'not-found'), rejectOffer)(args)).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: pastDate })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'CANCELLED', expiresAt: futureDate })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is accepted', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'ACCEPTED', expiresAt: futureDate })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'REJECTED', expiresAt: futureDate })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'COMPLETED', expiresAt: futureDate })
    await expect(rejectOffer(args)).rejects.toBeDefined()
  })
  it('throws if the state update by trigger is not valid', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: futureDate })
    await expect(
      pipe(
        assoc('updateArgs', {
          trigger: {
            by: 'not-receiver'
          }
        }),
        rejectOffer
      )(args)
    ).rejects.toBeDefined()
  })
  it('reject offer if its not expired', async () => {
    await unchecked_updateOffer(args.offerId, { state: 'OPEN', expiresAt: futureDate })
    await rejectOffer(args)
    const updatedOffer = (await findOfferById(args.offerId))!
    const createdStateUpdate = (await findOfferStateUpdate(args.offerId, 'REJECTED'))!
    createdStateUpdateId = createdStateUpdate.id
    expect(updatedOffer.state).toEqual('REJECTED')
    expectDateNumberIsNow(updatedOffer.updatedAt)
    expect(createdStateUpdate).toBeDefined()
  })
})

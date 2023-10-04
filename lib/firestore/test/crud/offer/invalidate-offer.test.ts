import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { invalidateOffer } from '@echo/firestore/crud/offer/invalidate-offer'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { expectDateNumberIsNow } from '@echo/test-utils/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/offer/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - invalidateOffer', () => {
  let initialState: FirestoreOfferState
  let initialExpiresAt: number
  let initialUpdatedAt: number
  const offerId = 'LyCfl6Eg7JKuD7XJ6IPi'

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
  })
  afterEach(async () => {
    await updateOffer(offerId, { state: initialState, expiresAt: initialExpiresAt, updatedAt: initialUpdatedAt })
  })

  it('throws if the offer is undefined', async () => {
    await expect(invalidateOffer('not-found')).rejects.toBeDefined()
  })
  it('throws if the offer is expired', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().subtract(1, 'day').unix() })
    await expect(invalidateOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is cancelled', async () => {
    await updateOffer(offerId, { state: 'CANCELLED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is completed', async () => {
    await updateOffer(offerId, { state: 'COMPLETED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is rejected', async () => {
    await updateOffer(offerId, { state: 'REJECTED', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateOffer(offerId)).rejects.toBeDefined()
  })
  it('throws if the offer is invalid', async () => {
    await updateOffer(offerId, { state: 'INVALID', expiresAt: dayjs().add(1, 'day').unix() })
    await expect(invalidateOffer(offerId)).rejects.toBeDefined()
  })
  it('invalidate offer', async () => {
    await updateOffer(offerId, { state: 'OPEN', expiresAt: dayjs().add(1, 'day').unix() })
    await invalidateOffer(offerId)
    const updatedOffer = (await findOfferById(offerId))!
    expect(updatedOffer.state).toEqual('INVALID')
    expectDateNumberIsNow(updatedOffer.updatedAt)
  })
})
